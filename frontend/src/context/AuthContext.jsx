import { createContext, useContext, useState } from 'react';

// 1. Create the context
const AuthContext = createContext();

// 2. Create the Provider (this wraps your app in main.jsx)
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (email) => {
    setUser({ email, name: "Traveler" });
    // In a real app, this is where you'd save a token to localStorage
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Export the custom hook (THIS is what Login.jsx is looking for!)
export const useAuth = () => useContext(AuthContext);