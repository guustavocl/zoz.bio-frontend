import { RgbaColor } from "react-colorful";
import { LinkProps } from "./LinkProps";

export interface PagePropsStatus {
  key: string;
  message: string;
}

export interface PagePropsSocialMedia {
  key: string;
  username: string;
}

export interface PageProps {
  pagename: string;
  uname: string;
  status: PagePropsStatus;
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
  socialMedias: PagePropsSocialMedia[];
  pageLinks: LinkProps[];
}
