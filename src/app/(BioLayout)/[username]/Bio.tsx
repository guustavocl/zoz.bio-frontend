import { PageProps } from "@/types/PageProps";
import { defaultPage } from "@/utils/BioVariables";
import { cookies } from "next/headers";
import Image from "next/image";
import React from "react";
import BioAvatar from "./BioAvatar";
import BioBadges from "./BioBadges";
import BioInfos from "./BioInfos";
import BioLinks from "./BioLinks";
import BioNavigation from "./BioNavigation";
import BioSocials from "./BioSocials";
import BioCard from "./BioCard";

export const BioComponent = ({ page }: { page: PageProps }) => {
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
          <BioNavigation page={page} user={user} />
          <div className="mt-28 relative select-none w-full flex flex-row gap-2 mb-2 min-h-[200px]">
            <BioAvatar page={page} />
            <BioCard page={page} className="w-full z-10 mb-0">
              <div className="flex w-full flex-col pl-[31%] md:pl-[30%]">
                <BioInfos page={page} />
                <BioBadges page={page} />
                <BioSocials page={page} />
              </div>
            </BioCard>
          </div>
          <BioLinks page={page} />
        </div>
      </div>
    </>
  );
};
