import BioCard from "@/app/(BioLayout)/[username]/BioCard";
import BioNavigation from "@/app/(BioLayout)/[username]/BioNavigation";
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
import CssDoodle from "@/components/CssDoodle/CssDoodle";

export const EditComponent = ({ page }: { page: PageProps }) => {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("zoz_user");
  const user = userCookie ? JSON.parse(userCookie?.value) : undefined;
  const backgroundUrl = page?.backgroundUrl || defaultPage.bgUrl;
  const backGroundOpacity = page?.backGroundOpacity || defaultPage.bgOpacity;

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center overflow-hidden">
        {backgroundUrl ? (
          <Image
            fill
            quality={90}
            priority={true}
            placeholder="empty"
            src={backgroundUrl}
            className="-z-50"
            style={{
              objectFit: "cover",
              opacity: backGroundOpacity,
              backgroundColor: "#080808",
              backgroundRepeat: "repeat",
              backgroundPosition: "center",
            }}
            alt={`${page.pagename} bio page background`}
            sizes="(max-width: 768px) 768px, (max-width: 1200px) 1200px, 1980px"
          />
        ) : (
          <CssDoodle />
        )}
        <BioNavigation page={page} user={user} />
        <div className="relative container md:w-[42rem] flex w-full h-screen flex-col items-center overflow-y-auto">
          <EditBackground page={page} />
          <div className="relative select-none w-full flex flex-col sm:flex-row gap-3 sm:gap-2 sm:min-h-[12rem] flex-shrink-0">
            <EditAvatar pageName={page.pagename} page={page} />
            <BioCard page={page} className="w-full z-10 py-[0.6rem] px-3">
              <div className="flex w-full flex-col pt-3 sm:pt-0 sm:pl-[30%] gap-2 md:gap-1">
                <EditInfos page={page} />
                <EditBadges page={page} />
                <EditSocials page={page} />
              </div>
            </BioCard>
          </div>

          <div className="flex flex-col w-full gap-3 md:gap-2 my-2 mb-28">
            <EditLinks page={page} />
          </div>
        </div>
      </div>
    </>
  );
};
