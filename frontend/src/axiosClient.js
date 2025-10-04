// ✅ Import axios HTTP client
import axios from "axios";

// ✅ Create a reusable axios instance for your API
const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:4000/api", // All API requests will start with this base URL
  withCredentials: true,                // Always send cookies (accessToken + refreshToken) automatically
});

// ✅ Setup a response interceptor → listens for ALL responses
axiosClient.interceptors.response.use(
  // 🔹 If the response is successful (status 2xx), just return it
  (res) => res,

  // 🔹 If an error happens (non-2xx response), handle it here
  async (error) => {
    const originalRequest = error.config; // Save the failed request so we can retry it later

    // ⚠️ Check: was the error due to "Unauthorized" (401)?
    // Also check: did we already retry this request? (avoid infinite loops)
    if (
      error.response &&                     // Make sure server sent a response
      error.response.status === 401 &&      // The error is "Unauthorized"
      !originalRequest._retry               // Haven’t retried this request yet
    ) {
      originalRequest._retry = true;        // Mark this request so we don’t retry twice

      try {
        // 🔄 Ask backend to refresh the access token (using refreshToken in cookies)
        await axiosClient.post("/refresh");

        // 🔁 If refresh worked → retry the original failed request
        return axiosClient(originalRequest);
      } catch (refreshError) {
        // ❌ If refresh also failed (refreshToken expired or invalid) → force logout
        window.location.href = "/login"; // Redirect user to login page
        return Promise.reject(refreshError);
      }
    }

    // ❌ If error is NOT 401, or retry already happened → reject the error
    return Promise.reject(error);
  }
);

// ✅ Export axiosClient so you can use it anywhere in your frontend
export default axiosClient;
