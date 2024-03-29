import { UserProps } from "@/types/UserProps";
import { CustomAxios } from "./CustomAxios";
import { handleAxiosError } from "@/utils/ErrorHandler";

const API_ENDPOINT = "user";

export const getAccount = async () => {
  try {
    const request = await CustomAxios.get(`${API_ENDPOINT}/logged`, {
      withCredentials: true,
    });
    return request.data;
  } catch (err: Error | unknown) {
    handleAxiosError(err);
  }
};

export const createAccount = async (values: UserProps) => {
  try {
    const request = await CustomAxios.post(`${API_ENDPOINT}`, values);
    return request.data;
  } catch (err: Error | unknown) {
    handleAxiosError(err);
  }
};

export const sendConfirmEmail = async (email: string, recapthca?: string) => {
  try {
    const request = await CustomAxios.post(
      `${API_ENDPOINT}/send_confirm_email`,
      {
        email,
        recapthca,
      },
      {
        withCredentials: true,
      }
    );
    return request.data;
  } catch (err: Error | unknown) {
    handleAxiosError(err);
  }
};
