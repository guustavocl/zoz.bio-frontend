import { UserProps } from "@/types/UserProps";
import { CustomAxios } from "./CustomAxios";
import { handleAxiosError } from "@/utils/ErrorHandler";

const API_ENDPOINT = "auth";

export const create = async (values: UserProps) => {
  try {
    const request = await CustomAxios.post(`${API_ENDPOINT}/create`, values);
    return request.data;
  } catch (err: Error | unknown) {
    handleAxiosError(err);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const request = await CustomAxios.post(
      `${API_ENDPOINT}/login`,
      {
        email: email,
        password: password,
      },
      { withCredentials: true }
    );
    return request.data;
  } catch (err: Error | unknown) {
    handleAxiosError(err);
  }
};

export const logout = async (userId?: string | undefined) => {
  try {
    const request = await CustomAxios.post(`${API_ENDPOINT}/logout`, { id: userId }, { withCredentials: true });
    return request.data;
  } catch (err: Error | unknown) {
    handleAxiosError(err);
  }
};
