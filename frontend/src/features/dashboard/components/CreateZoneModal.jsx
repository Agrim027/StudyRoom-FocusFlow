import React from 'react';

/**
 * CreateZoneModal Component
 * Modal dialog for creating a new focus zone.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls visibility
 * @param {Function} props.onClose - Close handler
 * @param {Function} props.onSubmit - Submit handler passing (name, description)
 * @param {string} props.zoneName - Current value of zone name input
 * @param {Function} props.setZoneName - Setter for zone name
 * @param {string} props.zoneDesc - Current value of zone description input
 * @param {Function} props.setZoneDesc - Setter for zone description
 */
const CreateZoneModal = ({ 
  isOpen, 
  onClose, 
  onSubmit, 
  zoneName, 
  setZoneName, 
  zoneDesc, 
  setZoneDesc 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md transition-opacity">
      <div className="glass-panel w-full max-w-md p-8 rounded-3xl transform transition-all animate-in fade-in zoom-in-95 duration-200">
        <h3 className="text-2xl font-bold text-aurora-text mb-6">Create Focus Zone</h3>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-aurora-text-muted mb-1.5 ml-1">Zone Name</label>
            <input
              type="text"
              required
              className="glass-input w-full px-4 py-3 rounded-xl"
              placeholder="e.g., Deep Work, CS101 Study Group"
              value={zoneName}
              onChange={(e) => setZoneName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-aurora-text-muted mb-1.5 ml-1">Description</label>
            <textarea
              required
              className="glass-input w-full px-4 py-3 rounded-xl resize-none"
              rows="3"
              placeholder="What's the goal for this zone?"
              value={zoneDesc}
              onChange={(e) => setZoneDesc(e.target.value)}
            ></textarea>
          </div>
          <div className="flex justify-end space-x-3 mt-8 pt-6 border-t border-aurora-border">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-aurora-text-muted hover:text-aurora-text hover:bg-aurora-surface-hover rounded-xl transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-aurora-primary to-[#8A73E6] hover:from-aurora-primary-hover hover:to-aurora-primary text-white rounded-xl shadow-[0_0_15px_rgba(110,86,207,0.4)] transition-all font-bold transform hover:-translate-y-0.5"
            >
              Create Zone
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateZoneModal;
