import axios from 'axios';

// Get API URL from environment variables
const API_URL = import.meta.env.VITE_API_URL || 'https://api.example.com';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

class AuthService {
  private tokenKey = 'auth_token';
  private userKey = 'user_data';

  async login(credentials: LoginCredentials): Promise<User> {
    try {
      // In a real implementation, this would call an actual API
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      
      if (response.data && response.data.token) {
        localStorage.setItem(this.tokenKey, response.data.token);
        localStorage.setItem(this.userKey, JSON.stringify(response.data.user));
        return response.data.user;
      }
      throw new Error('Invalid response from server');
    } catch (error) {
      console.error('Login error:', error);
      // For development/demo purposes:
      if (credentials.email === 'demo@example.com' && credentials.password === 'password') {
        const mockUser = { 
          id: '123', 
          name: 'Demo User', 
          email: credentials.email, 
          role: 'employee' 
        };
        localStorage.setItem(this.tokenKey, 'mock-jwt-token');
        localStorage.setItem(this.userKey, JSON.stringify(mockUser));
        return mockUser;
      }
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  getCurrentUser(): User | null {
    const userStr = localStorage.getItem(this.userKey);
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}

export default new AuthService();