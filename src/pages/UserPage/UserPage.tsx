import React, { useState } from "react";
import { UserIcon } from "./UserIcon";
import { SectionCard } from "./SectionCard";
import { useToasts } from "../../context/ToastProvider/useToasts";
import { IPage } from "../../types/IPage";
import { getBadge, getStatusIcon } from "./IconsList";
import "./UserPage.css";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { Cog6ToothIcon } from "@heroicons/react/20/solid";

type UserPageProps = {
  page: IPage;
};

const UserPage = ({ page }: UserPageProps) => {
  const { successToast } = useToasts();
  const auth = useAuth();
  // TODO
  // blur effect on loading maybe? blur-sm

  //VARIABLES FROM DB
  const primaryColor = page?.primaryColor || "#4106a0";
  const secondaryColor = page?.secondaryColor || "#9466cf";
  const fontColor = page?.fontColor || "#f1f1f1";
  document.body.style.setProperty("--page-primary-color", primaryColor);
  document.body.style.setProperty("--page-secondary-color", secondaryColor);
  document.body.style.setProperty("--page-font-color", fontColor);

  const pfpUrl =
    page?.pfpUrl ||
    "https://cdn.ayo.so/b8e5c2fa49635c2a491966c74799259def4ee4a24f417615.webp";
  const backgroundUrl = page?.backgroundUrl || "";
  // "https://serving.photos.photobox.com/45795567072228eca2d9d55686345294c3aaaa80f1cfa3eae3383bd95c543626c36cbea9.jpg";
  const backgroundSize = page?.backgroundSize || "cover"; // auto cover contain
  const backGroundOpacity = page?.backGroundOpacity || 0.5;

  const pageSocialMedias = page?.socialMedias || [
    { username: "f6bb1aca-457f-4c80-9619-cd5684d49082", key: "pix" },
    { username: "Gustavo~#1500", key: "discord" },
    { username: "guustavocl", key: "twitter" },
    { username: "guustavocl", key: "facebook" },
    { username: "guustavocl", key: "instagram" },
    { username: "guustavocl", key: "github" },
    { username: "guustavocl", key: "steam" },
    { username: "guustavocl", key: "telegram" },
  ];

  const pageBadges = page?.badges || [
    "egirl",
    "developer",
    "coder",
    "singer",
    "sleeper",
    "musician",
  ];

  const pageStatus = {
    icon: "sleepo",
    message: "sleeping~",
  };

  return (
    <React.Fragment>
      {/* Link to Account settings Start */}
      <a
        href="/account"
        rel="noopener noreferrer"
        className="hsecondary hidden absolute left-0 md:flex text-sm bg-opacity-5 opacity-50 p-1 px-2 m-2 rounded-lg font-semibold hover:opacity-90"
      >
        <Cog6ToothIcon className="h-5" aria-hidden="true" />
      </a>
      {/* Link to Account settings End */}
      {/* Page Background Start*/}
      <div
        className="absolute w-full h-screen bg-gradient-to-br -z-50"
        style={{
          backgroundSize: backgroundSize,
          backgroundRepeat: "repeat",
          backgroundPosition: "center",
          backgroundImage: `url(${backgroundUrl})`,
          opacity: backGroundOpacity,
        }}
      ></div>
      {/* Page Background End*/}

      <div className="flex flex-col items-center max-w-2x1 px-0 mx-2 sm:px-10 p-2 md:w-full h-screen overflow-y-auto">
        {/* Page Card Start */}
        <SectionCard className="mt-28 select-none" page={page}>
          <React.Fragment>
            {/* Page Status Start */}
            {pageStatus && getStatusIcon(pageStatus.icon) ? (
              <div className="absolute flex flex-row opacity-50 hover:opacity-100">
                <img
                  className="w-7"
                  src={getStatusIcon(pageStatus.icon).icon}
                  alt={getStatusIcon(pageStatus.icon).label}
                />
              </div>
            ) : null}
            {/* Page Status End */}
            {/* Page Avatar Start*/}
            <div className="flex flex-col justify-center items-center min-w-fit">
              <div className="flex-shrink-0 p-2">
                <img
                  className="ring-avatar hover:animate-pulse h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 object-cover rounded-full ring-1 border-2 bg-black"
                  src={pfpUrl}
                  alt="pfp"
                />
              </div>
            </div>
            {/* Page Avatar End*/}
            <div className="flex flex-col">
              {/* Page Infos Start */}
              <div className="flex flex-col items-center">
                <h2
                  className="page-font-color flex flex-row items-center text-center text-2xl font-bold tracking-wide leading-5"
                  style={{
                    textShadow: "2px 2px #00000090",
                  }}
                >
                  {page?.uname || "No name~"}
                  <img className="w-7" src="./icons/extra/startag.png" alt="" />
                </h2>
                <span
                  className="text-sm font-semibold cursor-pointer -mt-1 hsecondary tracking-wide"
                  onClick={() => {
                    successToast(`Copyed`);
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(
                        `https://zoz.gg/${page?.pagename || ""}`
                      );
                    }
                  }}
                >
                  {`zoz.gg/${page?.pagename || ""}`}
                </span>
                <div
                  className="page-font-color opacity-70 text-center flex flex-col items-center mt-3 text-sm font-semibold tracking-tight break-words"
                  style={{
                    lineHeight: "0.9rem",
                  }}
                >
                  {page?.bio}
                </div>
              </div>
              {/* Page Infos End */}
              {/* Page Badges Start */}
              <div className="flex flex-row flex-wrap gap-2 mt-3 justify-center">
                {pageBadges.map((badge, idx) =>
                  getBadge(badge) ? (
                    <span
                      key={idx}
                      className="ring-badges whitespace-nowrap text-xs font-semibold px-1 py-0.5 rounded ring-1 shadow-black shadow-md"
                    >
                      {getBadge(badge)?.label}
                    </span>
                  ) : null
                )}
              </div>
              {/* Page Badges End */}
              {/* Page Social Media Start */}
              <div className="flex flex-row gap-1 items-center justify-center mt-3">
                {pageSocialMedias.map((media, idx) => (
                  <UserIcon key={idx} media={media} idx={idx} />
                ))}
              </div>
              {/* Page Social Media End */}
            </div>
          </React.Fragment>
        </SectionCard>
        {/* Page Card End */}

        {/*  Links Start */}
        <SectionCard page={page}>
          <React.Fragment>
            <div className="col-span-5 flex flex-col items-center leading-3 ml-4 p-1">
              <h2 className="text-center text-2xl font-bold tracking-wide text-neutral-300 leading-5">
                Link aqui
              </h2>
            </div>
          </React.Fragment>
        </SectionCard>
        {/* Links End */}
      </div>
    </React.Fragment>
  );
};

export default UserPage;
