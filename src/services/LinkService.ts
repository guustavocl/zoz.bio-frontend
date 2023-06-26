import { LinkProps } from "@/types/LinkProps";
import { CustomAxios } from "./CustomAxios";
import { handleAxiosError } from "@/utils/ErrorHandler";

const API_ENDPOINT = "link";

export const getFolders = async (pagename: string) => {
  try {
    const request = await CustomAxios.get(`${API_ENDPOINT}`, {
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
      `${API_ENDPOINT}`,
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

export const updateLink = async (link: LinkProps, pagename: string) => {
  try {
    const request = await CustomAxios.put(
      `${API_ENDPOINT}`,
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

export const deleteLink = async (linkId: string, pagename: string) => {
  try {
    const request = await CustomAxios.put(
      `${API_ENDPOINT}/delete`,
      {
        linkId,
        pagename,
      },
      { withCredentials: true }
    );
    return request.data;
  } catch (err: Error | unknown) {
    handleAxiosError(err);
  }
};
