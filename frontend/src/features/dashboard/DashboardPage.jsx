import React, { useEffect, useState } from 'react';
import Navbar from '../../shared/components/Navbar';
import ActivityMetrics from './components/ActivityMetrics';
import SessionHistory from './components/SessionHistory';
import FocusZoneGrid from './components/FocusZoneGrid';
import CreateZoneModal from './components/CreateZoneModal';
import { focusZoneService, productivitySessionService } from '../../shared/api/apiClient';
import { Plus } from 'lucide-react';

/**
 * DashboardPage Container
 * Main entry point for the user after logging in. Contains activity metrics
 * and allows users to browse, create, or join Focus Zones.
 */
const DashboardPage = () => {
  const [availableZones, setAvailableZones] = useState([]);
  const [userSessionHistory, setUserSessionHistory] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  
  // Modal Form State
  const [newZoneName, setNewZoneName] = useState('');
  const [newZoneDesc, setNewZoneDesc] = useState('');
  
  // Join Room State
  const [joinZoneCode, setJoinZoneCode] = useState('');

  useEffect(() => {
    loadDashboardData();
  }, []);

  /**
   * Fetches zones and user history in parallel for performance.
   */
  const loadDashboardData = async () => {
    try {
      const [zonesRes, historyRes] = await Promise.all([
        focusZoneService.getAvailableZones(),
        productivitySessionService.getUserHistory()
      ]);
      setAvailableZones(zonesRes.data);
      setUserSessionHistory(historyRes.data);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const handleCreateZone = async (e) => {
    e.preventDefault();
    try {
      const response = await focusZoneService.createZone(newZoneName, newZoneDesc);
      setAvailableZones((prev) => [...prev, response.data]);
      setIsCreateModalOpen(false);
      setNewZoneName('');
      setNewZoneDesc('');
    } catch (error) {
      console.error('Failed to create focus zone:', error);
    }
  };

  const handleJoinZone = async (e) => {
    e.preventDefault();
    if (!joinZoneCode.trim()) return;
    try {
      const response = await focusZoneService.joinZone(joinZoneCode.trim().toUpperCase());
      // Check if zone is already in the list
      const exists = availableZones.some(z => z.id === response.data.id);
      if (!exists) {
        setAvailableZones((prev) => [...prev, response.data]);
      }
      setJoinZoneCode('');
    } catch (error) {
      alert('Failed to join zone: ' + (error.response?.data || 'Invalid code'));
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[10%] w-[50%] h-[50%] rounded-full bg-aurora-primary/10 blur-[150px] animate-float"></div>
        <div className="absolute bottom-[-20%] right-[10%] w-[50%] h-[50%] rounded-full bg-aurora-accent/5 blur-[150px] animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar title="FocusFlow" />

        <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {/* Top Section: Metrics and History */}
          <div className="mb-12">
            <ActivityMetrics sessionHistory={userSessionHistory} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="glass-card rounded-2xl p-8 h-full flex flex-col justify-center text-center relative overflow-hidden">
                  {/* Internal ambient glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-aurora-primary/20 rounded-full blur-[60px]"></div>
                  
                  <h3 className="text-3xl font-extrabold text-aurora-text mb-4 tracking-tight">Ready to focus?</h3>
                  <p className="text-aurora-text-muted mb-8 max-w-md mx-auto text-lg">
                    Join a Focus Zone with your peers or create a new one to start tracking your productivity sessions.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                    <form onSubmit={handleJoinZone} className="flex items-center w-full sm:w-auto shadow-lg rounded-xl overflow-hidden">
                      <input
                        type="text"
                        placeholder="Enter Zone Code"
                        value={joinZoneCode}
                        onChange={(e) => setJoinZoneCode(e.target.value.toUpperCase())}
                        className="px-5 py-3.5 bg-aurora-bg/60 border border-aurora-border focus:bg-aurora-bg focus:border-aurora-primary outline-none w-full sm:w-56 text-sm text-aurora-text placeholder-aurora-text-muted transition-all"
                      />
                      <button
                        type="submit"
                        className="bg-aurora-surface-hover hover:bg-aurora-border text-aurora-text px-6 py-3.5 font-semibold transition-colors border border-l-0 border-aurora-border text-sm"
                      >
                        Join
                      </button>
                    </form>
                    <span className="text-aurora-text-muted font-bold text-sm uppercase tracking-widest">OR</span>
                    <button
                      onClick={() => setIsCreateModalOpen(true)}
                      className="flex items-center justify-center space-x-2 bg-gradient-to-r from-aurora-primary to-[#8A73E6] hover:from-aurora-primary-hover hover:to-aurora-primary text-white px-8 py-3.5 rounded-xl shadow-[0_0_20px_rgba(110,86,207,0.3)] hover:shadow-[0_0_25px_rgba(110,86,207,0.5)] transition-all w-full sm:w-auto font-bold text-sm transform hover:-translate-y-0.5"
                    >
                      <Plus className="h-5 w-5" />
                      <span>Create Zone</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <SessionHistory sessionHistory={userSessionHistory} />
              </div>
            </div>
          </div>

          {/* Bottom Section: Available Zones */}
          <div className="mb-8 border-t border-aurora-border pt-10">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-3xl font-extrabold tracking-tight text-aurora-text flex items-center space-x-3">
                <span className="w-2 h-8 bg-aurora-accent rounded-full inline-block"></span>
                <span>Your Focus Zones</span>
              </h2>
            </div>
            <FocusZoneGrid zones={availableZones} />
          </div>
        </main>
      </div>

      <CreateZoneModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateZone}
        zoneName={newZoneName}
        setZoneName={setNewZoneName}
        zoneDesc={newZoneDesc}
        setZoneDesc={setNewZoneDesc}
      />
    </div>
  );
};

export default DashboardPage;
