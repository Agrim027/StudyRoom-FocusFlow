import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import useAuthStore from '../../store/authStore';
import { focusZoneService, productivitySessionService } from '../../shared/api/apiClient';
import Navbar from '../../shared/components/Navbar';
import TimerPanel from './components/TimerPanel';
import LiveChatBox from './components/LiveChatBox';

/**
 * FocusZonePage Container
 * Main interface for an active Focus Zone. Establishes a STOMP WebSocket
 * connection for real-time chat and session timer synchronization.
 */
const FocusZonePage = () => {
  const { id: zoneId } = useParams();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  
  const [zoneDetails, setZoneDetails] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  
  // Dictionary of active sessions keyed by username
  const [activeSessions, setActiveSessions] = useState({}); 
  
  const stompClientRef = useRef(null);

  useEffect(() => {
    loadZoneData();
    const client = establishWebSocketConnection();

    return () => {
      if (client) {
        client.deactivate();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoneId]);

  /**
   * Fetches the zone details and currently active sessions
   */
  const loadZoneData = async () => {
    try {
      const [zoneRes, sessionsRes] = await Promise.all([
        focusZoneService.getZoneDetails(zoneId),
        productivitySessionService.getActiveSessions(zoneId)
      ]);
      setZoneDetails(zoneRes.data);
      
      const sessionsMap = {};
      sessionsRes.data.forEach(s => {
        sessionsMap[s.username] = s;
      });
      setActiveSessions(sessionsMap);
    } catch (error) {
      console.error('Failed to load zone data', error);
      navigate('/'); // Redirect if zone is invalid or inaccessible
    }
  };

  /**
   * Initializes and configures the STOMP WebSocket client
   */
  const establishWebSocketConnection = () => {
    const wsUrl = import.meta.env.VITE_WS_URL;
    if (!wsUrl) {
      console.warn("VITE_WS_URL environment variable is missing!");
    }
    
    if (import.meta.env.PROD && wsUrl && !wsUrl.startsWith('https://')) {
      console.warn("WebSocket URL should start with https:// when using SockJS in production!");
    }

    const socket = new SockJS(wsUrl);
    const client = new Client({
      webSocketFactory: () => socket,
      debug: import.meta.env.PROD ? null : (str) => console.log(str), // Disable in production
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    client.onConnect = () => {
      // Subscribe to the zone's public topic
      client.subscribe(`/topic/room/${zoneId}`, handleIncomingStompMessage);

      // Broadcast join event
      client.publish({
        destination: `/app/chat.addUser/${zoneId}`,
        body: JSON.stringify({ sender: user.username, type: 'JOIN', roomId: zoneId }),
      });
    };

    client.onStompError = (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    };

    client.activate();
    stompClientRef.current = client;
    return client;
  };

  /**
   * Handler for all incoming STOMP messages on the subscribed topic
   */
  const handleIncomingStompMessage = (payload) => {
    const message = JSON.parse(payload.body);
    if (!message.timestamp) {
      message.timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    
    switch (message.type) {
      case 'SESSION_START': {
        const sessionData = JSON.parse(message.content);
        setActiveSessions((prev) => ({ ...prev, [message.sender]: sessionData }));
        break;
      }
      case 'SESSION_END': {
        setActiveSessions((prev) => {
          const next = { ...prev };
          delete next[message.sender];
          return next;
        });
        break;
      }
      default:
        // Handle CHAT, JOIN, LEAVE
        setChatMessages((prev) => [...prev, message]);
        break;
    }
  };

  /**
   * Submits a new chat message to the STOMP broker
   */
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (chatInput.trim() && stompClientRef.current) {
      const chatMessage = {
        sender: user.username,
        content: chatInput,
        type: 'CHAT',
        roomId: zoneId
      };
      stompClientRef.current.publish({
        destination: `/app/chat.sendMessage/${zoneId}`,
        body: JSON.stringify(chatMessage),
      });
      setChatInput('');
    }
  };

  /**
   * Starts a focus session for the current user and broadcasts it
   */
  const handleStartSession = async () => {
    try {
      const response = await productivitySessionService.startSession(zoneId);
      const sessionData = response.data;
      
      // Update local state optimistically
      setActiveSessions(prev => ({ ...prev, [user.username]: sessionData }));
      
      // Broadcast to other users
      if (stompClientRef.current) {
        stompClientRef.current.publish({
          destination: `/app/chat.sendMessage/${zoneId}`,
          body: JSON.stringify({
            sender: user.username,
            type: 'SESSION_START',
            roomId: zoneId,
            content: JSON.stringify(sessionData)
          }),
        });
      }
    } catch (error) {
      console.error('Failed to start session', error);
    }
  };

  /**
   * Ends the current user's focus session and broadcasts it
   */
  const handleStopSession = async () => {
    const mySession = activeSessions[user.username];
    if (!mySession) return;
    
    try {
      await productivitySessionService.endSession(mySession.id);
      
      // Update local state optimistically
      setActiveSessions(prev => {
        const next = { ...prev };
        delete next[user.username];
        return next;
      });
      
      // Broadcast to other users
      if (stompClientRef.current) {
        stompClientRef.current.publish({
          destination: `/app/chat.sendMessage/${zoneId}`,
          body: JSON.stringify({
            sender: user.username,
            type: 'SESSION_END',
            roomId: zoneId,
            content: ''
          }),
        });
      }
    } catch (error) {
      console.error('Failed to end session', error);
    }
  };

  // Loading state
  if (!zoneDetails) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="text-gray-500 font-medium">Entering Focus Zone...</p>
        </div>
      </div>
    );
  }

  // Custom pill showing connection status
  const connectionIndicator = (
    <div className="flex items-center space-x-2 bg-green-500/10 text-green-400 px-4 py-2 rounded-full text-sm font-bold border border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
      </span>
      <span className="hidden sm:inline">Connected as {user.username}</span>
    </div>
  );

  return (
    <div className="flex flex-col h-screen relative overflow-hidden bg-aurora-bg">
      {/* Background ambient glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-aurora-primary/10 blur-[150px] animate-float"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-aurora-accent/5 blur-[150px] animate-float" style={{ animationDelay: '3s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <Navbar 
          title={zoneDetails.name} 
          subtitle={zoneDetails.description} 
          showBack={true} 
          customRightElement={connectionIndicator} 
        />

        {/* Main Content Area */}
        <div className="flex flex-col lg:flex-row flex-1 overflow-hidden max-w-7xl w-full mx-auto p-4 gap-6">
          
          <TimerPanel 
            activeSessions={activeSessions}
            currentUsername={user.username}
            onStartSession={handleStartSession}
            onStopSession={handleStopSession}
          />

          <LiveChatBox 
            messages={chatMessages}
            currentUsername={user.username}
            inputMessage={chatInput}
            setInputMessage={setChatInput}
            onSendMessage={handleSendMessage}
          />
          
        </div>
      </div>
    </div>
  );
};

export default FocusZonePage;
