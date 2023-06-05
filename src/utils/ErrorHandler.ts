import { AxiosError } from "axios";

export const handleAxiosError = async (err: AxiosError | unknown) => {
  if (err instanceof AxiosError) throw err && err?.response?.data ? err.response.data : err;
  else throw err;
};
