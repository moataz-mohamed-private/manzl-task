import axios from "axios";

export const createAuthRequest = (
  baseURL: string,
  token?: string | null,
) => {
  const authRequest = axios.create({
    baseURL: baseURL,
  });

  authRequest.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    async error => await Promise.reject(error),
  );

return authRequest;
}