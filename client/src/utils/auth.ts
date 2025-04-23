import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile(): JwtPayload | null {
    try {
      return jwtDecode(this.getToken());
    } catch (e) {
      console.error("Invalid token in getProfile", e);
      return null;
    }
  }

  loggedIn(): boolean {
    const token = this.getToken();
  
    // Basic structure check: JWT should have 3 parts
    if (!token || token.split('.').length !== 3) return false;
  
    try {
      jwtDecode(token); // Decode to verify structure & validity
      return !this.isTokenExpired(token);
    } catch (err) {
      console.error("Invalid token in loggedIn()", err);
      return false;
    }
  }
  isTokenExpired(token: string): boolean {
    try {
      const decodedToken = jwtDecode<JwtPayload>(token);
      const tokenValidUntil = decodedToken.exp || 0;
      const now = Math.floor(Date.now() / 1000);
      return now > tokenValidUntil;
    } catch (err) {
      console.error("Token expiration check failed", err);
      return true;
    }
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  login(idToken: string) {
    localStorage.setItem('token', idToken);
    setTimeout(() => {
      window.location.href = '/';
    }, 500);
  }

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
}

export default new AuthService();
