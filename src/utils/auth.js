// src/utils/auth.js
// JWT helper functions using jose (browser-compatible)
import { SignJWT, jwtVerify } from 'jose';

const SECRET_KEY = new TextEncoder().encode('fastfood-super-secret-jwt-key-2025');
const TOKEN_KEY = 'ff_auth_token';

/**
 * Generate a signed JWT token with user payload
 */
export const generateToken = async (payload) => {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // expires in 7 days
    .sign(SECRET_KEY);
  return token;
};

/**
 * Verify and decode a JWT token
 * Returns decoded payload or null if invalid/expired
 */
export const verifyToken = async (token) => {
  try {
    const { payload } = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch {
    return null;
  }
};

/**
 * Save JWT token to localStorage
 */
export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Get JWT token from localStorage
 */
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Remove JWT token from localStorage (logout)
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Mock user database (in real app this would be a backend)
const USERS_KEY = 'ff_users';

export const getUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

export const saveUser = (user) => {
  const users = getUsers();
  const exists = users.find(u => u.email === user.email);
  if (exists) return false; // user already exists
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
};

export const findUser = (email, password) => {
  const users = getUsers();
  return users.find(u => u.email === email && u.password === password) || null;
};
