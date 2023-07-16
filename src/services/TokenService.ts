import { CustomAxios } from "./CustomAxios";
import { handleAxiosError } from "@/utils/ErrorHandler";

const API_ENDPOINT = "token";

export const confirmEmail = async (token: string) => {
  try {
    const request = await CustomAxios.post(`${API_ENDPOINT}/confirm_email`, {
      token,
    });
    return request.data;
  } catch (err: Error | unknown) {
    handleAxiosError(err);
  }
};
