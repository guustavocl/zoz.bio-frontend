import axios from "axios";

export const CustomAxios = axios.create({
  baseURL: process.env.EXPRESS_API_URL || "http://127.0.0.1:3100",
  headers: {
    "Content-Type": "application/json",
  },
});
