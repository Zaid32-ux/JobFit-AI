import axios from "axios";
import { useAuthStore } from "@/stores/authStore";

const API_URL = "http://localhost:3001/api";

let isRefreshing = false;
let subscribers = [];

const notifySubscribers = (token) => {
  subscribers.forEach((cb) => cb(token));
  subscribers = [];
};

const api = axios.create({ baseURL: API_URL });

// Request interceptor
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (err.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(err);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve) => {
        subscribers.push((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(api(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      const refreshToken = localStorage.getItem("refreshToken");

      if (!refreshToken) {
        useAuthStore.getState().logout();
        return Promise.reject(err);
      }

      const res = await axios.post(`${API_URL}/auth/refresh`, {
        token: refreshToken,
      });

      const newToken = res.data.token;
      useAuthStore.getState().setToken(newToken);

      notifySubscribers(newToken);

      originalRequest.headers.Authorization = `Bearer ${newToken}`;
      return api(originalRequest);

    } catch (e) {
      useAuthStore.getState().logout();
      return Promise.reject(e);
    } finally {
      isRefreshing = false;
    }
  }
);

//  Wrapper
export const request = async (config) => {
  try {
    const res = await api(config);
    return res.data;
  } catch (err) {
    console.error("API request failed", err);
    throw err.response?.data || err;
  }
};

export default api;