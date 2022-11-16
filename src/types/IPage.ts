export interface IPage {
  pagename: string;
  uname: string;
  status: string;
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

  cardsOpacity: number;
  fontColor: string;
  backgroundSize: string;
  backGroundOpacity: number;
  cardBlur: string;
  cardHueRotate: string;
  badges: string[];
  socialMedias: [{ username: string; key: string }];
}
