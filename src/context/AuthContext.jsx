/* eslint-disable react-refresh/only-export-components */
// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { generateToken, verifyToken, saveToken, getToken, removeToken, findUser, saveUser, getUsers } from '../utils/auth';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);       // decoded user payload
  const [token, setToken] = useState(null);     // raw JWT string
  const [authLoading, setAuthLoading] = useState(true); // initial token check

  // On app load: check localStorage for existing valid token
  useEffect(() => {
    const initAuth = async () => {
      const savedToken = getToken();
      if (savedToken) {
        const payload = await verifyToken(savedToken);
        if (payload) {
          // Fetch full user details from the database
          const users = getUsers();
          const dbUser = users.find(u => u.email === payload.email);
          if (dbUser) {
            setUser({
              name: dbUser.name,
              email: dbUser.email,
              location: dbUser.location || "",
              phone: dbUser.phone || "",
              bio: dbUser.bio || ""
            });
          } else {
            setUser({ name: payload.name, email: payload.email, location: "", phone: "", bio: "" });
          }
          setToken(savedToken);
        } else {
          // Token expired or invalid — clean up
          removeToken();
        }
      }
      setAuthLoading(false);
    };
    initAuth();
  }, []);

  /**
   * Sign In: find user in mock DB, generate JWT, store it
   */
  const signIn = async (email, password) => {
    const found = findUser(email, password);
    if (!found) {
      return { success: false, error: 'Invalid email or password.' };
    }
    const payload = { name: found.name, email: found.email };
    const newToken = await generateToken(payload);
    saveToken(newToken);
    setToken(newToken);
    setUser({
      name: found.name,
      email: found.email,
      location: found.location || "",
      phone: found.phone || "",
      bio: found.bio || ""
    });
    return { success: true };
  };

  /**
   * Sign Up: register new user, generate JWT, store it
   */
  const signUp = async (name, email, password) => {
    const saved = saveUser({ name, email, password, location: "", phone: "", bio: "" });
    if (!saved) {
      return { success: false, error: 'An account with this email already exists.' };
    }
    const payload = { name, email };
    const newToken = await generateToken(payload);
    saveToken(newToken);
    setToken(newToken);
    setUser({
      name,
      email,
      location: "",
      phone: "",
      bio: ""
    });
    return { success: true };
  };

  /**
   * Update Profile: edit user details in the mock DB and state
   */
  const updateProfile = async (updatedFields) => {
    if (!user) return { success: false, error: 'No authenticated user' };

    const users = getUsers();
    const index = users.findIndex(u => u.email === user.email);
    if (index === -1) {
      return { success: false, error: 'User not found in database' };
    }

    // Check email uniqueness if email is modified
    if (updatedFields.email && updatedFields.email !== user.email) {
      const emailExists = users.some(u => u.email === updatedFields.email);
      if (emailExists) {
        return { success: false, error: 'Email is already taken by another account.' };
      }
    }

    // Update local DB
    const dbUser = users[index];
    const updatedUser = {
      ...dbUser,
      ...updatedFields
    };
    users[index] = updatedUser;
    localStorage.setItem('ff_users', JSON.stringify(users));

    // Update current user state
    const newUserState = {
      name: updatedUser.name,
      email: updatedUser.email,
      location: updatedUser.location || "",
      phone: updatedUser.phone || "",
      bio: updatedUser.bio || ""
    };
    setUser(newUserState);

    // Generate new JWT if email or name changes to keep payload correct
    const payload = { name: updatedUser.name, email: updatedUser.email };
    const newToken = await generateToken(payload);
    saveToken(newToken);
    setToken(newToken);

    return { success: true };
  };

  /**
   * Logout: remove token, clear user state
   */
  const logout = () => {
    removeToken();
    setToken(null);
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, authLoading, signIn, signUp, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook for easy access
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
