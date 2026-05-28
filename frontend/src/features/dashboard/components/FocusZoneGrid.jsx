import React from 'react';
import { Users, BookOpen } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/**
 * FocusZoneGrid Component
 * Displays a grid of available study rooms (Focus Zones).
 * 
 * @param {Object} props
 * @param {Array} props.zones - Array of focus zones
 */
const FocusZoneGrid = ({ zones = [] }) => {
  const navigate = useNavigate();

  if (zones.length === 0) {
    return (
      <div className="text-center py-20 glass-card rounded-2xl mt-6 flex flex-col items-center justify-center">
        <div className="bg-aurora-bg/50 p-4 rounded-full mb-4">
          <BookOpen className="h-10 w-10 text-aurora-text-muted opacity-50" />
        </div>
        <h3 className="text-xl font-bold text-aurora-text mb-2">No Focus Zones Available</h3>
        <p className="text-aurora-text-muted">Get started by creating or joining a new zone.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {zones.map((zone) => (
        <div 
          key={zone.id} 
          className="glass-card rounded-2xl p-6 hover:border-aurora-primary/50 hover:shadow-[0_0_30px_rgba(110,86,207,0.15)] flex flex-col justify-between group cursor-pointer relative overflow-hidden"
          onClick={() => navigate(`/room/${zone.id}`)}
        >
          {/* Subtle gradient hover effect inside card */}
          <div className="absolute inset-0 bg-gradient-to-br from-aurora-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-aurora-text group-hover:text-aurora-primary transition-colors duration-300">{zone.name}</h3>
              <span className="bg-aurora-primary/20 text-aurora-primary text-xs font-bold px-3 py-1 rounded-full border border-aurora-primary/30 tracking-wider">
                {zone.roomCode}
              </span>
            </div>
            <p className="text-aurora-text-muted line-clamp-2 text-sm leading-relaxed">{zone.description}</p>
          </div>
          
          <div className="mt-8 flex items-center justify-between border-t border-aurora-border pt-4 relative z-10">
            <div className="flex items-center text-sm font-semibold text-aurora-accent bg-aurora-accent/10 px-3 py-1 rounded-lg">
              <Users className="h-4 w-4 mr-2" />
              <span>{zone.activeUsers?.length || 0} active</span>
            </div>
            <span className="text-aurora-text-muted group-hover:text-aurora-text text-sm font-semibold flex items-center transition-colors">
              Enter Zone
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FocusZoneGrid;
