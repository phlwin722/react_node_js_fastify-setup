// ✅ Import axios HTTP client
import axios from "axios";

// ✅ Create a reusable axios instance for your API
const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:4000/api", // All API requests will start with this base URL
  withCredentials: true,                // Always send cookies (accessToken + refreshToken) automatically
});

// ✅ Setup a response interceptor → listens for ALL responses
axiosClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    // ✅ Don't retry /refresh or /logout requests
    if (
      originalRequest.url.includes("/refresh") ||
      originalRequest.url.includes("/logout")
    ) {
      return Promise.reject(error);
    }

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        await axiosClient.post("/refresh");
        return axiosClient(originalRequest);
      } catch (refreshError) {
        window.location.href = "/signin";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);


// ✅ Export axiosClient so you can use it anywhere in your frontend
export default axiosClient;
