import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Cookie configuration
const TOKEN_KEY = "auth_token";
const USER_KEY = "user_data";

/**
 * Store authentication token in cookie
 * @param {string} token - JWT token
 * @param {number} expiresInDays - Cookie expiration in days (default: 7)
 */
export const setAuthToken = (token, expiresInDays = 7) => {
  Cookies.set(TOKEN_KEY, token, {
    expires: expiresInDays,
    secure: import.meta.env.PROD, // Use secure in production
    sameSite: "strict",
  });
};

/**
 * Get authentication token from cookie
 * @returns {string|null} JWT token or null
 */
export const getAuthToken = () => {
  return Cookies.get(TOKEN_KEY) || null;
};

/**
 * Remove authentication token from cookie
 */
export const removeAuthToken = () => {
  Cookies.remove(TOKEN_KEY);
};

/**
 * Store user data in localStorage
 * @param {Object} user - User object
 */
export const setUserData = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

/**
 * Get user data from localStorage
 * @returns {Object|null} User object or null
 */
export const getUserData = () => {
  const userData = localStorage.getItem(USER_KEY);
  return userData ? JSON.parse(userData) : null;
};

/**
 * Remove user data from localStorage
 */
export const removeUserData = () => {
  localStorage.removeItem(USER_KEY);
};

/**
 * Decode JWT token
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded token payload or null
 */
export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error("Failed to decode token:", error);
    return null;
  }
};

/**
 * Check if user is admin
 * @param {string|null} token - JWT token (optional, will get from cookie if not provided)
 * @returns {boolean} True if user is admin
 */
export const isAdmin = (token = null) => {
  const authToken = token || getAuthToken();

  if (!authToken) return false;

  const decoded = decodeToken(authToken);
  return decoded?.role === "admin";
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if user has valid token
 */
export const isAuthenticated = () => {
  const token = getAuthToken();
  if (!token) return false;

  try {
    const decoded = decodeToken(token);
    // Check if token is expired
    if (decoded?.exp && decoded.exp * 1000 < Date.now()) {
      removeAuthToken();
      removeUserData();
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

/**
 * Get user role from token
 * @returns {string|null} User role or null
 */
export const getUserRole = () => {
  const token = getAuthToken();
  if (!token) return null;

  const decoded = decodeToken(token);
  return decoded?.role || null;
};

/**
 * Clear all authentication data
 */
export const clearAuth = () => {
  removeAuthToken();
  removeUserData();
};
