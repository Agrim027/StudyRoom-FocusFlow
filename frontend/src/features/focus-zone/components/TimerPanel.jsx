import React from 'react';
import { Play, Square, Clock } from 'lucide-react';
import ParticipantCard from './ParticipantCard';

/**
 * TimerPanel Component
 * Main area of the Focus Zone showing all active users and their timers.
 * Allows the current user to start or stop their own focus session.
 * 
 * @param {Object} props
 * @param {Object} props.activeSessions - Dictionary mapping usernames to session objects
 * @param {string} props.currentUsername - The logged-in user's username
 * @param {Function} props.onStartSession - Handler for starting a session
 * @param {Function} props.onStopSession - Handler for stopping a session
 */
const TimerPanel = ({ 
  activeSessions, 
  currentUsername, 
  onStartSession, 
  onStopSession 
}) => {
  const hasActiveSession = !!activeSessions[currentUsername];

  return (
    <div className="flex-1 glass-panel rounded-3xl flex flex-col p-6 h-full overflow-y-auto relative z-10 custom-scrollbar">
      <div className="flex justify-between items-center mb-8 sticky top-0 bg-aurora-surface/80 backdrop-blur-md z-20 pb-4 border-b border-aurora-border -mx-6 px-6 pt-2 rounded-t-2xl">
        <h2 className="text-2xl font-extrabold text-aurora-text tracking-tight flex items-center">
          <Clock className="h-6 w-6 mr-3 text-aurora-primary" />
          Active Focus Timers
        </h2>
        {!hasActiveSession ? (
          <button 
            onClick={onStartSession}
            className="flex items-center space-x-2 bg-gradient-to-r from-aurora-primary to-[#8A73E6] hover:from-aurora-primary-hover hover:to-aurora-primary text-white px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(110,86,207,0.4)] transition-all font-bold transform hover:-translate-y-0.5"
          >
            <Play className="h-4 w-4 fill-current" />
            <span>Start Focusing</span>
          </button>
        ) : (
          <button 
            onClick={onStopSession}
            className="flex items-center space-x-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-6 py-2.5 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all font-bold"
          >
            <Square className="h-4 w-4 fill-current" />
            <span>Stop Session</span>
          </button>
        )}
      </div>

      {Object.keys(activeSessions).length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-aurora-text-muted">
          <div className="relative">
            <div className="absolute inset-0 bg-aurora-primary/20 blur-[40px] rounded-full"></div>
            <Clock className="h-24 w-24 mb-6 opacity-30 text-aurora-primary relative z-10 animate-float" />
          </div>
          <p className="text-xl font-bold text-aurora-text tracking-tight">No active focus sessions right now.</p>
          <p className="text-md mt-2 text-aurora-text-muted">Click "Start Focusing" to begin your journey!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(activeSessions).map(([username, session]) => (
            <ParticipantCard 
              key={session.id || username} 
              username={username} 
              session={session} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TimerPanel;
