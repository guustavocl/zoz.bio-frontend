import React from "react";
import { UserIcon } from "./UserIcon";
import { SectionCard } from "./SectionCard";
import { IPage, IPageSocialMedia, IPageStatus } from "../../types/IPage";
import { getBadge, getStatusIcon } from "./IconsList";
import "./UserPage.css";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { Cog6ToothIcon } from "@heroicons/react/20/solid";
import { BigHead } from "@bigheads/core";
import { defaultPage, setCssVariables } from "./UserVariables";
import { UserInfos } from "./UserInfos";

const mapLinks = (page: IPage) => {
  return page?.pageLinks
    ? page.pageLinks.map((link, idx) => (
        <SectionCard key={idx} page={page}>
          <React.Fragment>
            <div className="col-span-5 flex flex-col items-center leading-3 ml-4 p-1">
              <h2 className="text-center text-2xl font-bold tracking-wide text-neutral-300 leading-5">
                Link aqui
              </h2>
            </div>
          </React.Fragment>
        </SectionCard>
      ))
    : null;
};

const mapSocials = (pageSocialMedias: IPageSocialMedia[]) => {
  return (
    <div className="flex flex-row gap-1 items-center justify-center mt-3">
      {pageSocialMedias.map((media, idx) => (
        <UserIcon key={idx} media={media} />
      ))}
    </div>
  );
};

const mapBadges = (pageBadges: string[]) => {
  return (
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
  );
};

const getPageStatus = (status: IPageStatus) => {
  return status && getStatusIcon(status.key) ? (
    <div className="absolute -ml-1 -mt-1 flex flex-row opacity-50 hover:opacity-100">
      <img
        className="w-7"
        src={getStatusIcon(status.key).icon}
        alt={getStatusIcon(status.key).label}
        loading="lazy"
      />
    </div>
  ) : null;
};

const getAvatar = (pfpUrl: string | undefined) => {
  return (
    <div className="flex flex-col justify-center items-center min-w-fit flex-shrink-0 p-2">
      {pfpUrl ? (
        <img
          className="ring-avatar hover:animate-pulse h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 object-cover rounded-full ring-1 border-2"
          src={pfpUrl}
          alt="pfp"
          loading="lazy"
        />
      ) : (
        <div
          className="ring-avatar hover:animate-pulse h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 object-cover rounded-full ring-1 border-2"
          style={{ backgroundColor: "#85c5e5" }}
        >
          <BigHead />
        </div>
      )}
    </div>
  );
};

// TODO
// blur effect on loading maybe? blur-sm
const UserPage = ({ page }: { page: IPage }) => {
  const auth = useAuth();
  const primaryColor = page?.primaryColor || defaultPage.primaryColor;
  const secondaryColor = page?.secondaryColor || defaultPage.secondaryColor;
  const fontColor = page?.fontColor || defaultPage.fontColor;
  const pfpUrl = page?.pfpUrl || undefined;
  const backgroundUrl = page?.backgroundUrl || defaultPage.bgUrl;
  const backgroundSize = page?.backgroundSize || defaultPage.bgSize;
  const backGroundOpacity = page?.backGroundOpacity || defaultPage.bgOpacity;
  const pageSocialMedias =
    page?.socialMedias?.length > 0
      ? page.socialMedias
      : defaultPage.pageSocialMedias;

  const pageBadges =
    page?.badges?.length > 0 ? page.badges : defaultPage.pageBadges;
  const pageStatus = page?.status || defaultPage.pageStatus;
  setCssVariables(primaryColor, secondaryColor, fontColor);

  return (
    <React.Fragment>
      {/* Link to Account settings */}
      {auth && auth.email ? (
        <a
          href="/account"
          rel="noopener noreferrer"
          className="hidden absolute left-0 md:flex text-sm bg-opacity-5 opacity-50 p-1 px-2 m-2 rounded-lg font-semibold hover:opacity-90"
        >
          <Cog6ToothIcon className="h-5" aria-hidden="true" />
        </a>
      ) : null}
      {/* Page Background */}
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

      <div className="flex flex-col items-center max-w-2x1 px-0 mx-2 sm:px-10 p-2 md:w-full h-screen overflow-y-auto">
        {/* Page Primary Card */}
        <SectionCard className="mt-28 select-none" page={page}>
          <React.Fragment>
            {getPageStatus(pageStatus)}
            {getAvatar(pfpUrl)}
            <div className="flex flex-col w-full">
              <UserInfos page={page} />
              {mapBadges(pageBadges)}
              {mapSocials(pageSocialMedias)}
            </div>
          </React.Fragment>
        </SectionCard>
        {/* Page Other Cards */}
        {mapLinks(page)}
      </div>
    </React.Fragment>
  );
};

export default UserPage;
