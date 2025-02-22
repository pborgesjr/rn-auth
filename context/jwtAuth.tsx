import {
  createContext,
  FC,
  useContext,
  useLayoutEffect,
  useState,
} from "react";
import type { AuthProviderProps, JWTAuthContext } from "./types";
import { axiosInstance } from "../api/axios";
import { readSecureValue, saveSecureValue } from "../utils/secureStore";

const JWTAuthContext = createContext<JWTAuthContext | null>(null);

export const JWTAuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLoggedIn = (isLoggedIn: boolean) => setIsLoggedIn(isLoggedIn);

  /** Axios REQUEST Interceptor */
  useLayoutEffect(() => {
    const authInterceptor = axiosInstance.interceptors.request.use(
      async (config) => {
        const token = await readSecureValue("access_token");

        if (token && !config._retry) {
          console.log("✅ Adding token to request", token);
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(authInterceptor);
    };
  }, [isLoggedIn]);

  /** Axios RESPONSE Interceptor */
  useLayoutEffect(() => {
    const refreshInterceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          console.error("❌ Unauthorized response status", originalRequest.url);
          originalRequest._retry = true;

          const refreshToken = await readSecureValue("refresh_token");

          if (!refreshToken) {
            console.error("❌ No refresh token found");
            return Promise.reject(error);
          }

          try {
            const response = await axiosInstance.post<{
              access_token: string;
              refresh_token: string;
            }>("/refresh-token", {
              refreshToken,
            });
            console.log("✅ Refreshing token");
            await saveSecureValue("access_token", response.data.access_token);
            await saveSecureValue("refresh_token", response.data.refresh_token);

            originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;
            originalRequest._retry = true;

            setIsLoggedIn(true);

            console.log("✅Retrying original request", originalRequest.url);
            return axiosInstance(originalRequest);
          } catch (error) {
            return Promise.reject(error);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.response.eject(refreshInterceptor);
    };
  }, [isLoggedIn]);

  return (
    <JWTAuthContext.Provider
      value={{ isLoggedIn, setIsLoggedIn: toggleLoggedIn }}
    >
      {children}
    </JWTAuthContext.Provider>
  );
};

export const useJWTAuth = (): JWTAuthContext => {
  const context = useContext(JWTAuthContext);

  if (!context) {
    throw new Error("useJWTAuth must be used within an JWTAuthProvider");
  }

  return context;
};
