import React from 'react';
import { Activity, Clock, BookOpen } from 'lucide-react';

/**
 * ActivityMetrics Component
 * Displays aggregated statistics about the user's focus sessions.
 * 
 * @param {Object} props
 * @param {Array} props.sessionHistory - List of past sessions
 */
const ActivityMetrics = ({ sessionHistory = [] }) => {
  // Calculate total duration in seconds
  const totalSeconds = sessionHistory.reduce((acc, curr) => acc + (curr.durationSeconds || 0), 0);
  const totalHours = Math.floor(totalSeconds / 3600);
  const totalMinutes = Math.floor((totalSeconds % 3600) / 60);

  return (
    <div className="mb-12 relative z-10">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-aurora-primary/20 p-2 rounded-xl">
          <Activity className="h-6 w-6 text-aurora-accent animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-aurora-text tracking-tight">Your Productivity</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Time Card */}
        <div className="glass-card p-6 flex items-center space-x-5 group hover:border-aurora-primary/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-aurora-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="bg-aurora-primary/10 p-4 rounded-2xl text-aurora-primary group-hover:bg-aurora-primary/20 transition-colors">
            <Clock className="h-8 w-8" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-semibold text-aurora-text-muted uppercase tracking-wider mb-1">Total Focus Time</p>
            <p className="text-3xl font-extrabold text-aurora-text drop-shadow-md">
              {totalHours}h {totalMinutes}m
            </p>
          </div>
        </div>

        {/* Sessions Completed Card */}
        <div className="glass-card p-6 flex items-center space-x-5 group hover:border-aurora-accent/50 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-aurora-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="bg-aurora-accent/10 p-4 rounded-2xl text-aurora-accent group-hover:bg-aurora-accent/20 transition-colors">
            <BookOpen className="h-8 w-8" />
          </div>
          <div className="relative z-10">
            <p className="text-sm font-semibold text-aurora-text-muted uppercase tracking-wider mb-1">Sessions Completed</p>
            <p className="text-3xl font-extrabold text-aurora-text drop-shadow-md">{sessionHistory.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityMetrics;
