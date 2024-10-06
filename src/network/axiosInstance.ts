import axios from "axios";

const instance = axios.create({
  baseURL: "https://dev.copticoffice.com:3000/",
});

instance.defaults.timeout = 25000;
// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    if (typeof window !== "undefined" && localStorage?.getItem("authToken")) {
      (config.headers["Authorization"] as any) = `Bearer ${
        typeof window !== "undefined"
          ? localStorage?.getItem("authToken") || null
          : null
      }`;
    }
    (config.headers as any) = {
      ...config.headers,

      Source: "web",
    };
    // delete config.headers["Authorization"]
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    
    return response;
  },
  function (error) {
    const status = error?.response?.status;
    const url = error?.response?.config?.url;
    const token = localStorage.getItem("userToken");

    return Promise.reject(error);
  }
);

export default instance;
