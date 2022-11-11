import axios from "axios";
import { IUser } from "../types/IUser";

const endpoints = [
  {
      origin: 'localhost',
      endpoint: 'http://127.0.0.1:3100/'
  },
  {
      origin: '127.0.0.1',
      endpoint: 'http://127.0.0.1:3100/'
  },
  {
      origin: 'teste.zoz.gg',
      endpoint: 'http://api-teste.zoz.gg'
  },
  {
      origin: 'zoz.gg',
      endpoint: 'http://api.zoz.gg'
  }
]

export const Api = axios.create({
  baseURL: endpoints.find(e => (window.location.href).includes(e.origin))?.endpoint || "http://api.zoz.gg",
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
