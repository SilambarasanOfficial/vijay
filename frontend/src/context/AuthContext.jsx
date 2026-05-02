import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

// Check if a JWT token is still valid (not expired)
function isTokenValid(token) {
  if (!token) return false;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp * 1000 > Date.now();
  } catch {
    return false;
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => {
    const stored = localStorage.getItem('vj_admin_token');
    if (!isTokenValid(stored)) {
      localStorage.removeItem('vj_admin_token');
      return null;
    }
    return stored;
  });

  const login = (newToken) => {
    localStorage.setItem('vj_admin_token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('vj_admin_token');
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
