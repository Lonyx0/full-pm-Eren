import { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '../api/axios';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        // Check if token is expired
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          // Fetch user data
          fetchUserData(token);
        }
      } catch (error) {
        console.error('Invalid token:', error);
        logout();
      }
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await api.get('/auth/me');
      setUser(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user data:', error);
      // Don't logout - just decode the token for basic user info
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded.id });
        setLoading(false);
      } catch (decodeError) {
        console.error('Token decode error:', decodeError);
        logout();
      }
    }
  };

  const login = async (emailOrUsername, password) => {
    try {
      // Mock authentication for frontend testing
      if ((emailOrUsername === 'admin' || emailOrUsername === 'admin@admin.com') && password === 'admin') {
        const mockToken = 'mock-jwt-token-for-testing';
        const mockUser = {
          id: 'mock-user-id',
          username: 'admin',
          email: 'admin@admin.com',
        };
        
        localStorage.setItem('token', mockToken);
        localStorage.setItem('user', JSON.stringify(mockUser));
        setUser(mockUser);
        return { success: true };
      }

      // Real API call (will fail if backend is not running)
      const response = await api.post('/auth/login', {
        emailOrUsername,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      await fetchUserData(token);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Giriş başarısız. Backend çalışmıyorsa "admin/admin" ile giriş yapabilirsiniz.',
      };
    }
  };

  const register = async (username, email, password) => {
    try {
      const response = await api.post('/auth/register', {
        username,
        email,
        password,
      });
      const { token } = response.data;
      localStorage.setItem('token', token);
      await fetchUserData(token);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  const loginWithGoogle = () => {
    // Redirect to Google OAuth endpoint
    const backendUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    window.location.href = `${backendUrl}/auth/google`;
  };

  const handleGoogleCallback = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser({ id: decoded.id });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setLoading(false);
    window.location.href = '/';
  };

  const value = {
    user,
    loading,
    login,
    register,
    loginWithGoogle,
    handleGoogleCallback,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
