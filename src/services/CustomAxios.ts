import axios from "axios";

// TODO - use fetch instead
export const CustomAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_EXPRESS_API_URL || "http://127.0.0.1:3100",
  headers: {
    "Content-Type": "application/json",
  },
});
