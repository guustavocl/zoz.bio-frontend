import BioCard from "@/app/(BioLayout)/[username]/BioCard";
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
import EditLinks from "./EditLinks";

export const EditComponent = ({ page }: { page: PageProps }) => {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("zoz_user");
  const user = userCookie ? JSON.parse(userCookie?.value) : undefined;

  const pfpUrl = page?.pfpUrl || defaultPage.pfpUrl;
  const backgroundUrl = page?.backgroundUrl || defaultPage.bgUrl;
  const backGroundOpacity = page?.backGroundOpacity || defaultPage.bgOpacity;
  const pageStatus = page?.status || defaultPage.pageStatus;
  // const primaryColor = page?.primaryColor || defaultPage.primaryColor;
  // const secondaryColor = page?.secondaryColor || defaultPage.secondaryColor;
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
        <div className="container md:w-[42rem] flex w-full h-screen flex-col items-center overflow-y-auto">
          {/* Page Primary Card */}
          <BioNavigation page={page} user={user} />
          <EditBackground page={page} />
          <BioCard className="select-none flex flex-row" page={page}>
            <BioStatusIcon status={pageStatus} />
            <EditAvatar pageName={page.pagename} pfpUrl={pfpUrl} page={page} />
            <div className="flex w-full flex-col">
              <EditInfos page={page} />
              <EditBadges page={page} />
              <EditSocials page={page} />
            </div>
          </BioCard>
          <EditLinks page={page} />
        </div>
      </div>
    </>
  );
};
