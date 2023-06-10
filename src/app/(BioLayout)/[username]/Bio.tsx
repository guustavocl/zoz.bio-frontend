import { PageProps } from "@/types/PageProps";
import { defaultPage } from "@/utils/BioVariables";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";
import { ToastContainer } from "react-toastify";
import BioAvatar from "./BioAvatar";
import BioBadges from "./BioBadges";
import BioCard from "./BioCard";
import BioInfos from "./BioInfos";
import BioLinks from "./BioLinks";
import BioNavigation from "./BioNavigation";
import BioSocials from "./BioSocials";
import BioStatusIcon from "./BioStatusIcon";

export const BioComponent = ({ page }: { page: PageProps }) => {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("zoz_user");
  const user = userCookie ? JSON.parse(userCookie?.value) : undefined;

  const pfpUrl = page?.pfpUrl || undefined;
  const backgroundUrl = page?.backgroundUrl || defaultPage.bgUrl;
  const backGroundOpacity = page?.backGroundOpacity || defaultPage.bgOpacity;
  const pageSocialMedias = page?.socialMedias?.length > 0 ? page.socialMedias : defaultPage.pageSocialMedias;
  const pageBadges = page?.badges?.length > 0 ? page.badges : defaultPage.pageBadges;
  const pageStatus = page?.status || defaultPage.pageStatus;
  const primaryColor = page?.primaryColor || defaultPage.primaryColor;
  const secondaryColor = page?.secondaryColor || defaultPage.secondaryColor;
  const fontColor = page?.fontColor || defaultPage.fontColor;

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center overflow-hidden">
        <Image
          className="-z-50"
          src={backgroundUrl}
          fill
          style={{
            objectFit: "cover",
            opacity: backGroundOpacity,
            backgroundColor: "#080808",
            backgroundRepeat: "repeat",
            backgroundPosition: "center",
          }}
          quality={100}
          alt={`${page.pagename} bio page background`}
        />
        <div className="w-[90%] sm:w-[75%] md:w-full sm:max-w-3xl md:max-w-xl lg:max-w-2xl lg:w-[40rem] flex h-screen flex-col items-center overflow-y-auto">
          {/* Page Primary Card */}
          <BioNavigation page={page} user={user} />
          <BioCard className="mt-28 select-none" page={page}>
            <BioStatusIcon status={pageStatus} />
            <BioAvatar pfpUrl={pfpUrl} color={secondaryColor} />
            <div className="flex w-full flex-col">
              <BioInfos page={page} />
              <BioBadges badges={pageBadges} color={secondaryColor} />
              <BioSocials socialMedias={pageSocialMedias} />
            </div>
          </BioCard>
          <BioLinks page={page} />
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
