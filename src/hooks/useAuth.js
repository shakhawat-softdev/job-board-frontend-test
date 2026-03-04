import { useMutation } from "@tanstack/react-query";
import { authApi } from "../services/authApi";
import {
  setAuthToken,
  setUserData,
  clearAuth,
  isAdmin,
  decodeToken,
} from "../utils/auth";

export const useSignUp = (options = {}) => {
  return useMutation({
    mutationFn: (data) => authApi.register(data),
    onSuccess: (response) => {
      // Store token in cookie if provided by backend
      if (response.token) {
        setAuthToken(response.token);

        // Decode token to check role
        const decoded = decodeToken(response.token);
        console.log("User registered with role:", decoded?.role);

        if (isAdmin(response.token)) {
          console.log("Admin user registered");
        }
      }

      // Store user data in localStorage
      if (response.user) {
        setUserData(response.user);
      }

      options.onSuccess?.(response);
    },
    onError: (error) => {
      options.onError?.(error);
    },
  });
};

export const useLogin = (options = {}) => {
  return useMutation({
    mutationFn: (data) => authApi.login(data),
    onSuccess: (response) => {
      // Store token in cookie
      if (response.token) {
        setAuthToken(response.token);

        // Decode token to check role
        const decoded = decodeToken(response.token);
        console.log("User logged in:", decoded);
        console.log("Token expires:", new Date(decoded?.exp * 1000));

        if (isAdmin(response.token)) {
          console.log("Admin user logged in");
        }
      }

      // Store user data in localStorage
      if (response.user) {
        setUserData(response.user);
      }

      options.onSuccess?.(response);
    },
    onError: (error) => {
      options.onError?.(error);
    },
  });
};

export const useLogout = (options = {}) => {
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      // Clear all authentication data
      clearAuth();
      options.onSuccess?.();
    },
    onError: (error) => {
      options.onError?.(error);
    },
  });
};
