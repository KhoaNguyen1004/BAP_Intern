class TokenService {
  getLocalRefreshToken() {
    const user = this.getUser();
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = this.getUser();
    console.log('Retrieved access token:', user?.accessToken);
    return user?.accessToken;
  }

  updateLocalRefreshToken(token) {
    let user = this.getUser();
    user.refreshToken = token;
    localStorage.setItem('user', JSON.stringify(user));
  }

  updateLocalAccessToken(token) {
    let user = this.getUser();
    user.accessToken = token;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      console.log('User from localStorage:', JSON.parse(userStr));
      return JSON.parse(userStr);
    }
    return null;
  }

  setUser(user) {
    console.log('Setting user to localStorage:', user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem('user');
  }
}

export default new TokenService();
