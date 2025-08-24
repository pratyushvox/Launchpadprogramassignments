import type  { LoginCredentials } from '../types';

// Hardcoded credentials
const validCredentials = {
  username: 'admin',
  password: 'admin123'
};

export const authService = {
  login: async (credentials: LoginCredentials): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return (
      credentials.username === validCredentials.username &&
      credentials.password === validCredentials.password
    );
  },
  
  logout: async (): Promise<void> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
  }
};