import { RgbaColor } from "react-colorful";

export const setCssVariables = (primaryColor: RgbaColor, secondaryColor: RgbaColor, fontColor: string) => {
  if (document) {
    document.body.style.setProperty(
      "--page-primary-color",
      `rgb(${primaryColor.r},${primaryColor.g},${primaryColor.b},${primaryColor.a})`
    );
    document.body.style.setProperty(
      "--page-secondary-color",
      `rgb(${secondaryColor.r},${secondaryColor.g},${secondaryColor.b},${secondaryColor.a})`
    );
    document.body.style.setProperty("--page-font-color", fontColor);
  }
};

export const defaultPage = {
  primaryColor: { r: 65, g: 5, b: 160, a: 0.3 },
  secondaryColor: { r: 151, g: 71, b: 255, a: 0.3 },
  fontColor: "#f1f1f1",
  bgUrl: "./bg.png",
  bgSize: "cover",
  bgOpacity: 0.5,
  cardBlur: "backdrop-blur",
  cardHueRotate: "",
  cardSepia: "",
  pageSocialMedias: [{ username: "https://zoz.bio/", key: "website" }],
  pageBadges: ["welcome", "new", "zoz", "member"],
  pageStatus: { key: "sleepo", message: "sleeping~" },
};
