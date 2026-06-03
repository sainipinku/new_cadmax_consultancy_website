import axios from "axios";

// All API calls go through the proxy (port 3000 -> port 5001)
export const FILE_ORIGIN = ""; // Uses same origin since files are also served by backend

export const resolveFileUrl = (path) => {
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  const origin = window.location.origin;
  if (String(path).startsWith("/")) return `${origin}${path}`;
  return `${origin}/${path}`;
};

const instance = axios.create({
  baseURL: "/api",
  withCredentials: process.env.REACT_APP_WITH_CREDENTIALS === "true",
});

instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const method = (config.method || "get").toLowerCase();
    const hasBody = config.data !== undefined && config.data !== null;
    const isFormData =
      typeof FormData !== "undefined" && config.data instanceof FormData;

    if (
      hasBody &&
      !isFormData &&
      ["post", "put", "patch", "delete"].includes(method)
    ) {
      if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

//  OPTIONAL: response error logger 
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error?.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default instance;
