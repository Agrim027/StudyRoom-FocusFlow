import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';
import Login from './features/auth/Login';
import Register from './features/auth/Register';
import DashboardPage from './features/dashboard/DashboardPage';
import FocusZonePage from './features/focus-zone/FocusZonePage';

const ProtectedRoute = ({ children }) => {
  const token = useAuthStore((state) => state.token);
  return token ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <Routes>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/room/:id" element={<FocusZonePage />} />
              </Routes>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
