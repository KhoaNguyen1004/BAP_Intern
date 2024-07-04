import TokenService from './token.service';
import { http } from './http';

const setup = store => {
  http.interceptors.request.use(
    config => {
      const token = TokenService.getLocalAccessToken();
      if (token) {
        config.headers['Authorization'] = token;
      }
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return store;
};

export default setup;
