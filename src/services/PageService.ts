import { PagePropsSocialMedia } from "@/types/PageProps";
import { CustomAxios } from "./CustomAxios";
import { handleAxiosError } from "@/utils/ErrorHandler";
import { RgbaColor } from "react-colorful";
import { serverSideGet } from "./CustomFetch";

const API_ENDPOINT = "page";

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

export const fetchBioPage = async (pagename: string) => {
  try {
    const request = await serverSideGet(API_ENDPOINT, { pagename }, { revalidate: 10 });
    return await request?.json();
  } catch (err: Error | unknown) {
    return null;
  }
};

export const fetchEditPage = async (pagename: string, cookies: string) => {
  try {
    const request = await serverSideGet(`${API_ENDPOINT}/edit`, { pagename }, { revalidate: 0 }, cookies);
    return await request?.json();
  } catch (err: Error | unknown) {
    return null;
  }
};

export const checkPagename = async (pagename: string) => {
  try {
    const request = await CustomAxios.get(`${API_ENDPOINT}/check_pagename`, {
      params: { pagename },
      withCredentials: true,
    });
    return request.data;
  } catch (err: Error | unknown) {
    handleAxiosError(err);
  }
};

export const createPage = async (pagename: string) => {
  try {
    const request = await CustomAxios.post(`${API_ENDPOINT}/create`, { pagename }, { withCredentials: true });
    return request.data;
  } catch (err: Error | unknown) {
    handleAxiosError(err);
  }
};

export const savePageInfos = async (uname: string, bio: string, pagename: string, newPagename: string) => {
  try {
    const request = await CustomAxios.post(
      `${API_ENDPOINT}/save_info`,
      {
        uname,
        bio,
        pagename,
        newPagename,
      },
      { withCredentials: true }
    );
    return request.data;
  } catch (err: Error | unknown) {
    handleAxiosError(err);
  }
};

export const saveBadges = async (badges: string[], pagename: string) => {
  try {
    const request = await CustomAxios.post(
      `${API_ENDPOINT}/save_badges`,
      {
        badges,
        pagename,
      },
      { withCredentials: true }
    );
    return request.data;
  } catch (err: Error | unknown) {
    handleAxiosError(err);
  }
};

export const saveSocialMedia = async (items: PagePropsSocialMedia[], pagename: string) => {
  try {
    const request = await CustomAxios.post(
      `${API_ENDPOINT}/save_social_media`,
      {
        items,
        pagename,
      },
      { withCredentials: true }
    );
    return request.data;
  } catch (err: Error | unknown) {
    handleAxiosError(err);
  }
};

export const uploadAvatar = async (file: File, pagename: string) => {
  try {
    const request = await CustomAxios.post(
      `${API_ENDPOINT}/upload_avatar?pagename=${pagename}`,
      {
        avatar: file,
      },
      { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
    );
    return request.data;
  } catch (err: Error | unknown) {
    handleAxiosError(err);
  }
};

export const uploadBackground = async (file: File, pagename: string) => {
  try {
    const request = await CustomAxios.post(
      `${API_ENDPOINT}/upload_background?pagename=${pagename}`,
      {
        background: file,
      },
      { headers: { "Content-Type": "multipart/form-data" }, withCredentials: true }
    );
    return request.data;
  } catch (err: Error | unknown) {
    handleAxiosError(err);
  }
};

export const updateColors = async (
  primaryColor: RgbaColor,
  secondaryColor: RgbaColor,
  fontColor: string,
  pagename: string
) => {
  try {
    const request = await CustomAxios.post(
      `${API_ENDPOINT}/update_colors`,
      {
        primaryColor,
        secondaryColor,
        fontColor,
        pagename,
      },
      { withCredentials: true }
    );
    return request.data;
  } catch (err: Error | unknown) {
    handleAxiosError(err);
  }
};
