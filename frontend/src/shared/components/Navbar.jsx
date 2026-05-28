import React from 'react';
import { BookOpen, LogOut, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/authStore';

const Navbar = ({ title = "FocusFlow", subtitle, showBack = false, customRightElement }) => {
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  return (
    <header className="glass-panel sticky top-0 z-50 shrink-0 border-b-0 lg:border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {showBack && (
            <button 
              onClick={() => navigate('/')} 
              className="p-2 hover:bg-aurora-surface-hover rounded-full transition-all duration-300 text-aurora-text-muted hover:text-aurora-text"
              aria-label="Go back"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
          )}
          <div className="flex items-center space-x-3 group">
            {!showBack && (
              <div className="bg-aurora-primary/10 p-2 rounded-xl group-hover:bg-aurora-primary/20 transition-colors">
                <BookOpen className="text-aurora-accent h-7 w-7 animate-float" />
              </div>
            )}
            <div>
              <h1 className="text-2xl font-extrabold bg-gradient-to-r from-aurora-text to-aurora-text-muted bg-clip-text text-transparent tracking-tight">
                {title}
              </h1>
              {subtitle && <p className="text-sm text-aurora-text-muted font-medium mt-0.5">{subtitle}</p>}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          {customRightElement}
          {!customRightElement && user && (
            <>
              <div className="hidden sm:flex items-center space-x-2 bg-aurora-surface px-4 py-1.5 rounded-full border border-aurora-border">
                <div className="h-2 w-2 rounded-full bg-aurora-accent animate-pulse"></div>
                <span className="text-aurora-text-muted text-sm font-medium">{user.username}</span>
              </div>
              <button
                onClick={logout}
                className="flex items-center space-x-2 text-aurora-text-muted hover:text-red-400 transition-colors duration-300 bg-aurora-surface hover:bg-aurora-surface-hover px-4 py-2 rounded-xl border border-transparent hover:border-red-900/50"
              >
                <LogOut className="h-4 w-4" />
                <span className="text-sm font-semibold">Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
