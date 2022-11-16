export const setCssVariables = (
  primaryColor: string,
  secondaryColor: string,
  fontColor: string
) => {
  document.body.style.setProperty("--page-primary-color", primaryColor);
  document.body.style.setProperty("--page-secondary-color", secondaryColor);
  document.body.style.setProperty("--page-font-color", fontColor);
};

export const defaultPage = {
  primaryColor: "#4106a050",
  secondaryColor: "#9747ff50",
  fontColor: "#f1f1f1",
  bgUrl: "./bg.png",
  bgSize: "cover",
  bgOpacity: 0.5,
  cardBlur: "backdrop-blur",
  cardHueRotate: "",
  cardSepia: "",
  pageSocialMedias: [{ username: "https://zoz.gg/", key: "website" }],
  pageBadges: ["welcome", "new", "zoz", "member"],
  pageStatus: { icon: "sleepo", message: "sleeping~" },
};
