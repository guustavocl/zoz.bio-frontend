import { RgbaColor } from "react-colorful";

export interface IPageLinks {
  _id: string;
  url: string;
}

export interface IPageStatus {
  key: string;
  message: string;
}

export interface IPageSocialMedia {
  key: string;
  username: string;
}

export interface IPage {
  pagename: string;
  uname: string;
  status: IPageStatus;
  bio: string;
  pfpUrl: string;
  bannerUrl: string;
  backgroundUrl: string;
  backgroundOpacity: string;
  primaryColor: RgbaColor;
  secondaryColor: RgbaColor;
  subscription: string;
  isUnderConstruction: boolean;
  isPrivate: boolean;
  isBanned: boolean;
  isBlocked: boolean;
  isMod: boolean;
  isAdmin: boolean;
  adornment: string;
  fontColor: string;
  backgroundSize: string;
  backGroundOpacity: number;
  cardBlur: string;
  cardHueRotate: string;
  badges: string[];
  socialMedias: IPageSocialMedia[];
  pageLinks: IPageLinks[];
}
