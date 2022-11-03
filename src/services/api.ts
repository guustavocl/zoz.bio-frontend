import axios from "axios";
import { IUser } from "../types/IUser";
import authService from "./auth.service";

export const Api = axios.create({
  // baseURL: "127.0.0.1:3100"
  baseURL:
    import.meta.env.REACT_APP_MODE === "prod"
      ? import.meta.env.REACT_APP_PROD_API_URL
      : import.meta.env.REACT_APP_DEV_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function setInterceptors(user: IUser | null) {
  Api.interceptors.request.use(
    async (config) => {
      if (user && config && config.headers) {
        config.headers["Authorization"] = `Bearer ${user.token}`;
      }
      return config;
    },
    (error) => {
      console.log(error);
    }
  );

  Api.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response.status === 403) {
        localStorage.removeItem("u");
        window.location.reload();
      }
      throw error;
    }
  );
}