import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (requestConfig) => {
    const authUser = localStorage.getItem("authUser");
    if (authUser) {
      try {
        const user = JSON.parse(authUser);
        if (user.token) {
          requestConfig.headers.Authorization = `Bearer ${user.token}`;
        }
      } catch (error) {
        console.error("Failed to parse authUser:", error);
      }
    }
    requestConfig.withCredentials = true;
    return requestConfig;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    if (import.meta.env.DEV) {
      const method = response.config.method?.toUpperCase() ?? "unknown";
      const url = (response.config.baseURL ?? "") + (response.config.url ?? "");
      const icons = ["✨", "🫧", "🌈", "⭐️", "🌹", "🐱"];
      const randomIcon = icons[Math.floor(Math.random() * icons.length)];
      console.log("--------------------------------------------------");
      console.log(`${method} ${url} ${randomIcon}`);
      console.log("--------------------------------------------------");
    }
    return response;
  },
  (err) => {
    const error = {
      status: err.response ? err.response.status : null,
      data: err.response ? err.response.data : null,
      message: err.message,
    };
    if (error.status === 401) {
      localStorage.removeItem("authUser");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
