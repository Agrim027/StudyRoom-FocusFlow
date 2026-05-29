import React, { useEffect, useState } from 'react';

/**
 * ParticipantCard Component
 * Displays an individual user's active focus session, including their name,
 * avatar (initial), and a live-updating timer.
 * 
 * @param {Object} props
 * @param {string} props.username - The participant's username
 * @param {Object} props.session - The session object containing startTime
 */
const ParticipantCard = ({ username, session }) => {
  const [duration, setDuration] = useState('00:00:00');

  useEffect(() => {
    // Start a local timer to update the duration every second
    const timer = setInterval(() => {
      setDuration(formatDuration(session.startTime));
    }, 1000);

    // Initial calculation
    setDuration(formatDuration(session.startTime));

    return () => clearInterval(timer);
  }, [session.startTime]);

  const formatDuration = (startTimeIso) => {
    if (!startTimeIso) return '05:30:00';
    
    const start = new Date(startTimeIso).getTime();
    const now = new Date().getTime();
    const elapsedMs = Math.max(0, now - start);
    
    // 5 hours and 30 minutes in milliseconds
    const totalDurationMs = (5 * 3600 * 1000) + (30 * 60 * 1000);
    const remainingMs = totalDurationMs - elapsedMs;
    
    if (remainingMs <= 0) {
      return '00:00:00';
    }
    
    const diffSeconds = Math.floor(remainingMs / 1000);
    const h = Math.floor(diffSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((diffSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (diffSeconds % 60).toString().padStart(2, '0');
    
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="glass-card rounded-3xl p-8 flex flex-col items-center justify-center relative overflow-hidden group hover:border-aurora-accent/50 hover:shadow-[0_0_30px_rgba(0,210,211,0.2)]">
      <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-aurora-primary to-aurora-accent"></div>
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-aurora-primary/10 rounded-full blur-[40px] pointer-events-none transition-opacity opacity-0 group-hover:opacity-100"></div>

      <div className="h-16 w-16 bg-aurora-bg rounded-full flex items-center justify-center text-aurora-accent font-extrabold text-2xl mb-4 border-2 border-aurora-border group-hover:border-aurora-accent transition-colors shadow-[0_0_15px_rgba(0,0,0,0.5)] z-10">
        {username.charAt(0).toUpperCase()}
      </div>
      <h3 className="font-bold text-aurora-text mb-2 z-10 tracking-wide text-lg">{username}</h3>
      <div className="font-mono text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-aurora-primary to-[#8A73E6] tracking-wider z-10 drop-shadow-md">
        {duration}
      </div>
      <div className="mt-4 flex items-center bg-aurora-primary/10 px-3 py-1 rounded-full border border-aurora-primary/20 z-10">
        <span className="relative flex h-2.5 w-2.5 mr-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-aurora-accent opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-aurora-accent"></span>
        </span>
        <span className="text-xs font-bold text-aurora-accent uppercase tracking-widest">
          Focusing
        </span>
      </div>
    </div>
  );
};

export default ParticipantCard;
