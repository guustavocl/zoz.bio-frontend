import { LinkProps } from "@/types/LinkProps";
import { CustomAxios } from "./CustomAxios";
import { handleAxiosError } from "@/utils/ErrorHandler";

const API_ENDPOINT = "link";

export const getPage = async (pagename: string) => {
  try {
    const request = await CustomAxios.get(API_ENDPOINT, {
      params: { pagename },
    });
    return request.data;
  } catch (err: Error | unknown) {
    handleAxiosError(err);
  }
};

export const getFolders = async (pagename: string) => {
  try {
    const request = await CustomAxios.get(`${API_ENDPOINT}/folders`, {
      params: { pagename },
      withCredentials: true,
    });
    return request.data;
  } catch (err: Error | unknown) {
    handleAxiosError(err);
  }
};

export const createLink = async (link: LinkProps, pagename: string) => {
  try {
    const request = await CustomAxios.post(
      `${API_ENDPOINT}/create`,
      {
        link,
        pagename,
      },
      { withCredentials: true }
    );
    return request.data;
  } catch (err: Error | unknown) {
    handleAxiosError(err);
  }
};