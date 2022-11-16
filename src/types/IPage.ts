export interface IPageLinks {
  url: string;
}

export interface IPageStatus {
  icon: string;
  message: string;
}

export interface IPageSocialMedia {
  username: string;
  key: string;
}

export interface IPage {
  pagename: string;
  uname: string;
  status: { icon: string; message: string };
  bio: string;
  pfpUrl: string;
  bannerUrl: string;
  backgroundUrl: string;
  backgroundOpacity: string;
  primaryColor: string;
  secondaryColor: string;
  subscription: string;
  isUnderConstruction: boolean;
  isPrivate: boolean;
  isBanned: boolean;
  isBlocked: boolean;
  isMod: boolean;
  isAdmin: boolean;

  fontColor: string;
  backgroundSize: string;
  backGroundOpacity: number;
  cardBlur: string;
  cardHueRotate: string;
  badges: string[];
  socialMedias: IPageSocialMedia[];
  pageLinks: IPageLinks[];
}
