import { memo } from "react";
import PageIcon from "./BioIcon";
import SectionCard from "./BioCard";
import { PageProps, PagePropsSocialMedia, PagePropsStatus } from "@/types/PageProps";
import { getBadge, getStatusIcon } from "@/utils/IconsList";
// import { useAuth } from "../../context/AuthProvider/useAuth";
// import { Cog6ToothIcon } from "@heroicons/react/20/solid";
// import { BigHead } from "@bigheads/core";
import { defaultPage, setCssVariables } from "@/utils/BioVariables";
import PageInfos from "./BioInfos";
import "./Page.css";
import PageLinks from "./BioLinks";
import { LazyLoadImage } from "@/components/Loadings";

const mapSocials = (pageSocialMedias: PagePropsSocialMedia[]) => {
  return (
    <div className="mt-3 flex flex-row flex-wrap items-center justify-center gap-1">
      {pageSocialMedias.map((media, idx) => (
        <PageIcon key={idx} media={media} />
      ))}
    </div>
  );
};

const mapBadges = (pageBadges: string[]) => {
  return (
    <div className="mt-3 flex flex-row flex-wrap justify-center gap-2">
      {pageBadges.map((badge, idx) =>
        getBadge(badge) ? (
          <span
            key={idx}
            className="ring-badges whitespace-nowrap rounded px-1 py-0.5 text-xs font-semibold shadow-sm shadow-black ring-1"
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
    <div className="flex min-w-fit flex-shrink-0 flex-col items-center justify-center p-2">
      {pfpUrl ? (
        <img
          className="ring-avatar h-24 w-24 rounded-full border-2 object-cover ring-1 hover:animate-pulse md:h-28 md:w-28 lg:h-32 lg:w-32"
          src={pfpUrl}
          alt="pfp"
          loading="lazy"
        />
      ) : (
        <div
          className="ring-avatar h-24 w-24 rounded-full border-2 object-cover ring-1 hover:animate-pulse md:h-28 md:w-28 lg:h-32 lg:w-32"
          style={{ backgroundColor: "#85c5e5" }}
        >
          {/* <BigHead /> */}
        </div>
      )}
    </div>
  );
};

// TODO
// blur effect on loading maybe? blur-sm
const BioMain = ({ page }: { page: PageProps }) => {
  // const auth = useAuth();
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
    <>
      {/* Link to Account settings */}
      {/*  TODO MELHORAR ISSO AQUI */}
      {/* {auth && auth.email ? (
        <a
          href="/account"
          rel="noopener noreferrer"
          className="absolute left-0 m-2 hidden rounded-lg bg-opacity-5 p-1 px-2 text-sm font-semibold opacity-50 hover:opacity-90 md:flex"
        >
          <Cog6ToothIcon className="h-5" aria-hidden="true" />
        </a>
      ) : null} */}
      {/* Page Background */}
      {/* TODO VER ISSO AQUI EM */}
      <LazyLoadImage imageUrl={backgroundUrl} backgroundSize={backgroundSize} backGroundOpacity={backGroundOpacity} />

      <div className="max-w-2x1 mx-2 flex h-screen flex-col items-center overflow-y-auto p-2 px-0 sm:px-10 md:w-full">
        {/* Page Primary Card */}
        <SectionCard className="mt-28 select-none" page={page}>
          <>
            {getPageStatus(pageStatus)}
            {getAvatar(pfpUrl)}
            <div className="flex w-full flex-col">
              <PageInfos page={page} />
              {mapBadges(pageBadges)}
              {mapSocials(pageSocialMedias)}
            </div>
          </>
        </SectionCard>
        {/* Page Other Cards */}
        <PageLinks page={page} />
        {/* Bottom home link */}
        <div className="content bottom-1 mt-auto flex w-full flex-row content-end items-end justify-center self-end">
          <a
            className="font-sans text-2xl opacity-60 hover:opacity-90"
            href="/"
            rel="noopener noreferrer"
            style={{
              color: `rgb(${secondaryColor.r},${secondaryColor.g},${secondaryColor.b},${secondaryColor.a})`,
              fontFamily: "Iceland",
            }}
          >
            made with zoz.bio
          </a>
        </div>
      </div>
    </>
  );
};

export default memo(BioMain);
