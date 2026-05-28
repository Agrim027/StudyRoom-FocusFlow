import React, { useRef, useEffect } from 'react';
import { Send, MessageSquare } from 'lucide-react';

/**
 * LiveChatBox Component
 * Handles the display of real-time messages and the input form for sending new ones.
 * 
 * @param {Object} props
 * @param {Array} props.messages - List of chat messages
 * @param {string} props.currentUsername - The logged-in user's username
 * @param {string} props.inputMessage - Current value of the message input
 * @param {Function} props.setInputMessage - Setter for the message input
 * @param {Function} props.onSendMessage - Handler for submitting a message
 */
const LiveChatBox = ({ 
  messages, 
  currentUsername, 
  inputMessage, 
  setInputMessage, 
  onSendMessage 
}) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="w-full lg:w-96 glass-panel rounded-3xl flex flex-col h-[500px] lg:h-full shrink-0 relative z-10">
      <div className="p-5 border-b border-aurora-border bg-aurora-surface/80 backdrop-blur-md rounded-t-3xl flex items-center justify-between">
        <h3 className="font-extrabold text-lg text-aurora-text flex items-center tracking-tight">
          <MessageSquare className="h-5 w-5 mr-2 text-aurora-accent" />
          Live Chat
        </h3>
        <span className="text-xs font-semibold bg-aurora-bg px-2.5 py-1 rounded-lg text-aurora-text-muted border border-aurora-border">
          {messages.length} msgs
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-5 space-y-5 custom-scrollbar bg-aurora-bg/30">
        {messages.map((msg, idx) => {
          const isSystem = msg.type === 'JOIN' || msg.type === 'LEAVE';
          const isMe = msg.sender === currentUsername;

          if (isSystem) {
            return (
              <div key={idx} className="flex flex-col items-center my-2">
                <span className="text-xs text-aurora-text-muted bg-aurora-surface px-3 py-1 rounded-full font-medium border border-aurora-border">
                  {msg.sender} {msg.type === 'JOIN' ? 'joined' : 'left'} the zone
                </span>
              </div>
            );
          }

          return (
            <div key={idx} className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[80%] rounded-2xl p-4 shadow-md relative ${
                isMe 
                  ? 'bg-gradient-to-br from-aurora-primary to-[#8A73E6] text-white rounded-br-sm' 
                  : 'bg-aurora-surface border border-aurora-border text-aurora-text rounded-bl-sm'
              }`}>
                {!isMe && (
                  <span className="text-xs font-bold text-aurora-accent mb-1 block">{msg.sender}</span>
                )}
                <p className="text-sm leading-relaxed">{msg.content}</p>
                <span className={`text-[10px] mt-2 block font-medium ${isMe ? 'text-white/70' : 'text-aurora-text-muted'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 bg-aurora-surface/80 backdrop-blur-md border-t border-aurora-border rounded-b-3xl">
        <form onSubmit={onSendMessage} className="flex space-x-2 relative">
          <input
            type="text"
            className="flex-1 glass-input rounded-2xl px-5 py-3.5 pr-12 text-sm"
            placeholder="Type a message..."
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="absolute right-1.5 top-1.5 bottom-1.5 aspect-square flex items-center justify-center bg-gradient-to-r from-aurora-primary to-[#8A73E6] hover:from-aurora-primary-hover hover:to-aurora-primary text-white rounded-xl shadow-[0_0_10px_rgba(110,86,207,0.4)] disabled:opacity-50 disabled:shadow-none transition-all"
          >
            <Send className="h-4 w-4 transform -translate-y-0.5 translate-x-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default LiveChatBox;
