import React from 'react';
import { History } from 'lucide-react';

/**
 * SessionHistory Component
 * Displays a list of recent focus sessions completed by the user.
 * 
 * @param {Object} props
 * @param {Array} props.sessionHistory - List of past sessions
 */
const SessionHistory = ({ sessionHistory = [] }) => {
  return (
    <div className="glass-card p-6 h-full flex flex-col">
      <div className="flex items-center space-x-2 mb-6 border-b border-aurora-border pb-4">
        <div className="bg-[#8A73E6]/10 p-1.5 rounded-lg">
          <History className="h-5 w-5 text-[#8A73E6]" />
        </div>
        <h3 className="font-bold text-lg text-aurora-text tracking-tight">Recent Sessions</h3>
      </div>
      
      <ul className="space-y-4 text-sm flex-1 overflow-y-auto pr-2 custom-scrollbar">
        {sessionHistory.slice(0, 5).map(session => {
          const durationMinutes = Math.floor(session.durationSeconds / 60);
          const durationSeconds = session.durationSeconds % 60;
          
          return (
            <li key={session.id} className="flex justify-between items-center bg-aurora-bg/30 p-3 rounded-xl border border-aurora-border/50 hover:bg-aurora-bg/60 transition-colors">
              <span className="font-medium text-aurora-text-muted">
                {new Date(session.startTime).toLocaleDateString(undefined, { 
                  month: 'short', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
              <span className="font-bold text-aurora-accent bg-aurora-accent/10 px-3 py-1 rounded-full border border-aurora-accent/20 shadow-[0_0_10px_rgba(0,210,211,0.1)]">
                {durationMinutes}m {durationSeconds}s
              </span>
            </li>
          );
        })}
        
        {sessionHistory.length === 0 && (
          <li className="text-aurora-text-muted italic text-center py-8 flex flex-col items-center">
            <History className="h-10 w-10 opacity-20 mb-2" />
            <span>No completed sessions yet.<br/>Time to get to work!</span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default SessionHistory;
