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

export const EditComponent = ({ page }: { page: PageProps }) => {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("zoz_user");
  const user = userCookie ? JSON.parse(userCookie?.value) : undefined;
  const backgroundUrl = page?.backgroundUrl || defaultPage.bgUrl;
  const backGroundOpacity = page?.backGroundOpacity || defaultPage.bgOpacity;

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
          <BioNavigation page={page} user={user} editPage />
          <EditBackground page={page} />
          <div className="relative select-none w-full flex flex-row gap-2 mb-2 min-h-[200px]">
            <EditAvatar pageName={page.pagename} page={page} />
            <BioCard page={page} className="w-full z-10 mb-0">
              <div className="flex w-full flex-col pl-[31%] md:pl-[30%]">
                <EditInfos page={page} />
                <EditBadges page={page} />
                <EditSocials page={page} />
              </div>
            </BioCard>
          </div>
          <EditLinks page={page} />
        </div>
      </div>
    </>
  );
};
