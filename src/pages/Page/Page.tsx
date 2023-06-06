import React from "react";
import PageIcon from "./PageIcon";
import SectionCard from "./SectionCard";
import { PageProps, PagePropsSocialMedia, PagePropsStatus } from "../../types/PageProps";
import { getBadge, getStatusIcon } from "./IconsList";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { Cog6ToothIcon } from "@heroicons/react/20/solid";
import { BigHead } from "@bigheads/core";
import { defaultPage, setCssVariables } from "./PageVariables";
import PageInfos from "./PageInfos";
import "./Page.css";
import PageLinks from "./PageLinks";
import { LazyLoadImage } from "../../components/Loading";

const mapSocials = (pageSocialMedias: PagePropsSocialMedia[]) => {
  return (
    <div className="flex flex-row flex-wrap gap-1 items-center justify-center mt-3">
      {pageSocialMedias.map((media, idx) => (
        <PageIcon key={idx} media={media} />
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
            className="ring-badges whitespace-nowrap text-xs font-semibold px-1 py-0.5 rounded ring-1 shadow-black shadow-sm"
          >
            {getBadge(badge)?.label}
          </span>
        ) : null
      )}
    </div>
  );
};

const getPageStatus = (status: PagePropsStatus) => {
  const statusIcon = getStatusIcon(status.key);
  return statusIcon ? (
    <div className="absolute -ml-1 -mt-1 flex flex-row opacity-50 hover:opacity-100">
      <img className="w-7" src={statusIcon.icon} alt={statusIcon.label} loading="lazy" />
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
const Page = ({ page }: { page: PageProps }) => {
  const auth = useAuth();
  const primaryColor = page?.primaryColor || defaultPage.primaryColor;
  const secondaryColor = page?.secondaryColor || defaultPage.secondaryColor;
  const fontColor = page?.fontColor || defaultPage.fontColor;
  const pfpUrl = page?.pfpUrl || undefined;
  const backgroundUrl = page?.backgroundUrl || defaultPage.bgUrl;
  const backgroundSize = page?.backgroundSize || defaultPage.bgSize;
  const backGroundOpacity = page?.backGroundOpacity || defaultPage.bgOpacity;
  const pageSocialMedias = page?.socialMedias?.length > 0 ? page.socialMedias : defaultPage.pageSocialMedias;

  const pageBadges = page?.badges?.length > 0 ? page.badges : defaultPage.pageBadges;
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
      <LazyLoadImage imageUrl={backgroundUrl} backgroundSize={backgroundSize} backGroundOpacity={backGroundOpacity} />

      <div className="flex flex-col items-center max-w-2x1 px-0 mx-2 sm:px-10 p-2 md:w-full h-screen overflow-y-auto">
        {/* Page Primary Card */}
        <SectionCard className="mt-28 select-none" page={page}>
          <React.Fragment>
            {getPageStatus(pageStatus)}
            {getAvatar(pfpUrl)}
            <div className="flex flex-col w-full">
              <PageInfos page={page} />
              {mapBadges(pageBadges)}
              {mapSocials(pageSocialMedias)}
            </div>
          </React.Fragment>
        </SectionCard>
        {/* Page Other Cards */}
        <PageLinks page={page} />
        {/* Bottom home link */}
        <div className="bottom-1 flex flex-row w-full justify-center self-end content-end items-end mt-auto content">
          <a
            className="text-2xl opacity-60 hover:opacity-90 font-sans"
            href="/"
            rel="noopener noreferrer"
            style={{
              color: `rgb(${secondaryColor.r},${secondaryColor.g},${secondaryColor.b},${secondaryColor.a})`,
              fontFamily: "Iceland",
            }}
          >
            made with zoz.gg
          </a>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(Page);
