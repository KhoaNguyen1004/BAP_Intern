class TokenService {
  static getLocalRefreshToken() {
    const user = TokenService.getUser();
    return user?.refreshToken;
  }

  static getLocalAccessToken() {
    const user = TokenService.getUser();
    return user?.access_token;
  }

  static updateLocalRefreshToken(token) {
    let user = TokenService.getUser();
    user.refreshToken = token;
    localStorage.setItem('user', JSON.stringify(user));
  }

  static updateLocalAccessToken(token) {
    let user = TokenService.getUser();
    user.access_token = token;
    localStorage.setItem('user', JSON.stringify(user));
  }

  static getUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  static setUser(user) {
    console.log('Setting user to localStorage:', user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  static removeUser() {
    localStorage.removeItem('user');
  }
}

export default TokenService;
