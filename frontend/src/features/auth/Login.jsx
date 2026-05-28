import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAuthStore from '../../store/authStore';
import { authService } from '../../shared/api/apiClient';

/**
 * Login Component
 * Handles user authentication by verifying credentials
 * against the backend and storing the JWT token.
 */
const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  
  const loginToStore = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  /**
   * Submit handler for the login form
   * @param {React.FormEvent} e 
   */
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(userEmail, userPassword);
      // Extract token and user details from the response
      const { token, ...userData } = response.data;
      
      // Update global auth state
      loginToStore(userData, token);
      
      // Redirect to dashboard
      navigate('/');
    } catch (err) {
      setLoginError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-aurora-primary/20 blur-[120px] pointer-events-none animate-float"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-aurora-accent/20 blur-[120px] pointer-events-none animate-float" style={{ animationDelay: '3s' }}></div>

      <div className="w-full max-w-md space-y-8 glass-card rounded-3xl p-10 mx-4 relative z-10">
        <div>
          <div className="flex justify-center mb-6">
            <div className="bg-aurora-primary/20 p-4 rounded-2xl animate-glow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-aurora-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <h2 className="text-center text-3xl font-extrabold text-aurora-text tracking-tight">Sign in to FocusFlow</h2>
          <p className="mt-2 text-center text-sm text-aurora-text-muted">Enter your premium study environment</p>
        </div>
        
        {loginError && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-xl text-center text-sm font-medium">
            {loginError}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleAuthSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-aurora-text-muted mb-1.5 ml-1">Email address</label>
              <input
                type="email"
                required
                className="glass-input block w-full rounded-xl px-4 py-3 sm:text-sm"
                placeholder="you@example.com"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-aurora-text-muted mb-1.5 ml-1">Password</label>
              <input
                type="password"
                required
                className="glass-input block w-full rounded-xl px-4 py-3 sm:text-sm"
                placeholder="••••••••"
                value={userPassword}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-xl bg-gradient-to-r from-aurora-primary to-[#8A73E6] px-4 py-3 text-sm font-bold text-white hover:from-aurora-primary-hover hover:to-aurora-primary focus:outline-none focus:ring-2 focus:ring-aurora-primary focus:ring-offset-2 focus:ring-offset-aurora-bg transition-all duration-300 shadow-[0_0_20px_rgba(110,86,207,0.4)] hover:shadow-[0_0_25px_rgba(110,86,207,0.6)] transform hover:-translate-y-0.5"
            >
              Sign In
            </button>
          </div>
        </form>
        
        <div className="text-center text-sm pt-4">
          <Link to="/register" className="font-medium text-aurora-accent hover:text-[#33E0E0] transition-colors">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
