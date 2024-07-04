import TokenService from './token.service';
import { http } from './http';

class AuthService {
  async login(username, password) {
    try {
      const response = await http.post('/LoginProcessing', {
        username,
        password
      });
      if (response.data.error) {
        throw new Error(response.data.error);
      }
      TokenService.setUser(response.data);
      return response.data;
    } catch (error) {
      console.log('Login error:', error);
      throw error.response?.data?.message || 'Login failed!';
    }
  }

  logout() {
    TokenService.removeUser();
    return http.post('/logout');
  }

  async getProfile() {
    try {
      return await http.get('/profile');
    } catch (error) {
      throw error.response?.data?.message || 'Failed to get profile';
    }
  }
}

export default new AuthService();
