import { AxiosError } from "axios";

export const handleAxiosError = (err: AxiosError | unknown) => {
  if (err instanceof AxiosError && err?.response?.data) throw err.response.data;
  else throw err;
};

export const handleFetchError = (err: unknown | unknown) => {
  // if (err instanceof AxiosError && err?.response?.data) throw err.response.data;
  throw err;
};
