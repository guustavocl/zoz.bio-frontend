import BioCard from "@/app/(BioLayout)/[username]/BioCard";
import BioLinks from "@/app/(BioLayout)/[username]/BioLinks";
import BioNavigation from "@/app/(BioLayout)/[username]/BioNavigation";
import BioStatusIcon from "@/app/(BioLayout)/[username]/BioStatusIcon";
import { PageProps } from "@/types/PageProps";
import { defaultPage } from "@/utils/BioVariables";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";
import EditAvatar from "./EditAvatar";
import EditBadges from "./EditBadges";
import EditInfos from "./EditInfos";
import EditSocials from "./EditSocials";
import EditBackground from "./EditBackground";

export const EditComponent = ({ page }: { page: PageProps }) => {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("zoz_user");
  const user = userCookie ? JSON.parse(userCookie?.value) : undefined;

  const pfpUrl = page?.pfpUrl || defaultPage.pfpUrl;
  const backgroundUrl = page?.backgroundUrl || defaultPage.bgUrl;
  const backGroundOpacity = page?.backGroundOpacity || defaultPage.bgOpacity;
  const pageSocialMedias = page?.socialMedias?.length > 0 ? page.socialMedias : defaultPage.pageSocialMedias;
  const pageBadges = page?.badges?.length > 0 ? page.badges : defaultPage.pageBadges;
  const pageStatus = page?.status || defaultPage.pageStatus;
  // const primaryColor = page?.primaryColor || defaultPage.primaryColor;
  const secondaryColor = page?.secondaryColor || defaultPage.secondaryColor;
  // const fontColor = page?.fontColor || defaultPage.fontColor;

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
          quality={90}
          alt={`${page.pagename} bio page background`}
        />
        <div className="container lg:w-[42rem] flex w-full h-screen flex-col items-center overflow-y-auto">
          {/* Page Primary Card */}
          <BioNavigation page={page} user={user} />
          <EditBackground page={page} />
          <BioCard className="select-none" page={page}>
            <BioStatusIcon status={pageStatus} />
            <EditAvatar pageName={page.pagename} pfpUrl={pfpUrl} color={secondaryColor} />
            <div className="flex w-full flex-col">
              <EditInfos page={page} />
              <EditBadges page={page} badges={pageBadges} color={secondaryColor} />
              <EditSocials page={page} socialMedias={pageSocialMedias} />
            </div>
          </BioCard>
          <BioLinks page={page} />
        </div>
      </div>
    </>
  );
};
