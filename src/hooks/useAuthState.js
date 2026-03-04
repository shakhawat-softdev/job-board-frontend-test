import {
  isAuthenticated,
  isAdmin,
  getUserRole,
  getUserData,
} from "../utils/auth";

/**
 * Custom hook to get current authentication state
 * @returns {Object} Authentication state object
 */
export const useAuthState = () => {
  const authenticated = isAuthenticated();
  const admin = isAdmin();
  const role = getUserRole();
  const user = getUserData();

  return {
    isAuthenticated: authenticated,
    isAdmin: admin,
    role,
    user,
  };
};
