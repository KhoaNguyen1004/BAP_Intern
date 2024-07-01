import TokenService from './token.service';
import { http } from './http';
import {
  mockLogin,
  mockLogout,
  mockRegister
} from '../features/auth/login.mock';

class AuthService {
  async login(username, password) {
    try {
      const response = await mockLogin({ username, password });
      TokenService.setUser(response.data);
      return response.data;
    } catch (error) {
      throw error.response.data.message || 'Failed to login';
    }
  }

  logout() {
    TokenService.removeUser();
    return mockLogout();
  }

  async register(username, email, password) {
    try {
      const response = await mockRegister({ username, email, password });
      return response.data;
    } catch (error) {
      throw error.response.data.message || 'Failed to register';
    }
  }

  async getProfile() {
    return http.get('/profile').then(response => {
      return response.data;
    });
  }
}

export default new AuthService();
