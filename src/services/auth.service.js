// import { http } from './http';
// import TokenService from './token.service';

// class AuthService {
//   async login(username, password) {
//     return http
//       .post('/auth/signin', {
//         username,
//         password
//       })
//       .then(response => {
//         if (response.data.accessToken) {
//           TokenService.setUser(response.data);
//         }

//         return response.data;
//       });
//   }

//   logout() {
//     TokenService.removeUser();
//   }

//   async register(username, email, password) {
//     return http
//       .post('/auth/signup', {
//         username,
//         email,
//         password
//       })
//       .then(response => {
//         return response.data;
//       });
//   }
// }

// export default new AuthService();

import { mockLogin, mockRegister, mockLogout } from '../features/mock/Login';
import TokenService from './token.service';
import { http } from './http';

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
