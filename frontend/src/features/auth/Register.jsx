import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../../shared/api/apiClient';

/**
 * Register Component
 * Allows new users to create an account.
 */
const Register = () => {
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  
  const navigate = useNavigate();

  /**
   * Submit handler for the registration form
   * @param {React.FormEvent} e 
   */
  const handleRegistrationSubmit = async (e) => {
    e.preventDefault();
    
    // Basic frontend validation
    if (newUsername.length < 3) {
      setRegistrationError('Username must be at least 3 characters long');
      return;
    }
    
    if (newPassword.length < 6) {
      setRegistrationError('Password must be at least 6 characters long');
      return;
    }

    try {
      await authService.register(newUsername, newEmail, newPassword);
      // On success, redirect to login page
      navigate('/login');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.response?.data?.error || 'Registration failed due to a server error.';
      setRegistrationError(errorMessage);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-aurora-accent/20 blur-[120px] pointer-events-none animate-float"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-aurora-primary/20 blur-[120px] pointer-events-none animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-md space-y-8 glass-card rounded-3xl p-10 mx-4 relative z-10 my-8">
        <div>
          <div className="flex justify-center mb-6">
            <div className="bg-aurora-accent/20 p-4 rounded-2xl animate-glow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-aurora-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
            </div>
          </div>
          <h2 className="text-center text-3xl font-extrabold text-aurora-text tracking-tight">Create an account</h2>
          <p className="mt-2 text-center text-sm text-aurora-text-muted">Join the FocusFlow community</p>
        </div>
        
        {registrationError && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-center text-sm font-medium">
            {registrationError}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleRegistrationSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-aurora-text-muted mb-1.5 ml-1">Username</label>
              <input
                type="text"
                required
                className="glass-input block w-full rounded-xl px-4 py-3 sm:text-sm"
                placeholder="Choose a username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-aurora-text-muted mb-1.5 ml-1">Email address</label>
              <input
                type="email"
                required
                className="glass-input block w-full rounded-xl px-4 py-3 sm:text-sm"
                placeholder="you@example.com"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-aurora-text-muted mb-1.5 ml-1">Password</label>
              <input
                type="password"
                required
                className="glass-input block w-full rounded-xl px-4 py-3 sm:text-sm"
                placeholder="At least 6 characters"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-xl bg-gradient-to-r from-aurora-primary to-[#8A73E6] px-4 py-3 text-sm font-bold text-white hover:from-aurora-primary-hover hover:to-aurora-primary focus:outline-none focus:ring-2 focus:ring-aurora-primary focus:ring-offset-2 focus:ring-offset-aurora-bg transition-all duration-300 shadow-[0_0_20px_rgba(110,86,207,0.4)] hover:shadow-[0_0_25px_rgba(110,86,207,0.6)] transform hover:-translate-y-0.5"
            >
              Sign Up
            </button>
          </div>
        </form>
        
        <div className="text-center text-sm pt-4">
          <Link to="/login" className="font-medium text-aurora-accent hover:text-[#33E0E0] transition-colors">
            Already have an account? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
