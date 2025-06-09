import axios from "axios";
import { useAuthStore } from "../store";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API_URL,
  // this is for storing cookie
  withCredentials: true,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json",
  },
});

const refreshToken = async () => {
  await axios.post(
    `${import.meta.env.VITE_BACKEND_API_URL}/auth/refresh`,
    {},
    {
      withCredentials: true,
    }
  );
};

// use interceptors on response for exchanging access token and refresh token when access token expires
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    // isRetry flag is for handling infinite loop in interceptors
    if (error.response.status === 401 && !originalRequest._isRetry) {
      try {
        originalRequest._isRetry = true;
        const headers = { ...originalRequest.headers };
        // fetch new access and refresh token
        await refreshToken();
        //  pass the entire request and headers to the previosly called api
        return api.request({ ...originalRequest, headers });
      } catch (err) {
        console.log(err);
        useAuthStore.getState().logout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);
