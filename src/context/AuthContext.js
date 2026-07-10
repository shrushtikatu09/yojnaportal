import { createContext, useContext, useState } from "react";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    if (!email || !password) return { success: false, error: "Sabhi fields bharo." };
    if (password.length < 6) return { success: false, error: "Password kam se kam 6 characters ka hona chahiye." };
    const name = email.split("@")[0];
    setUser({ name: name.charAt(0).toUpperCase() + name.slice(1), email, avatar: name.charAt(0).toUpperCase(), joinedAt: new Date().toLocaleDateString("en-IN") });
    return { success: true };
  };

  const signup = (name, email, password) => {
    if (!name || !email || !password) return { success: false, error: "Sabhi fields bharo." };
    if (password.length < 6) return { success: false, error: "Password kam se kam 6 characters ka hona chahiye." };
    setUser({ name, email, avatar: name.charAt(0).toUpperCase(), joinedAt: new Date().toLocaleDateString("en-IN") });
    return { success: true };
  };

  const logout = () => setUser(null);
  return <AuthContext.Provider value={{ user, login, signup, logout }}>{children}</AuthContext.Provider>;
}

export function useAuth() { return useContext(AuthContext); }
