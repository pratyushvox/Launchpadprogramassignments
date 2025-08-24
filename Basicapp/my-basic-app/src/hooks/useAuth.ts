import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import  type { LoginCredentials } from '../types';
import { authService } from '../services/authService';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const isAuthenticated = await authService.login(credentials);
      
      if (isAuthenticated) {
        toast.success('Login successful! Welcome back!');
        navigate('/dashboard');
      } else {
        toast.error('Invalid username or password');
      }
    } catch (error) {
      toast.error('An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      toast.success('Logout successful! See you soon!');
      navigate('/');
    } catch (error) {
      toast.error('An error occurred during logout');
    }
  };

  return { login, logout, isLoading };
};