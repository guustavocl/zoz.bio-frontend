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
import CssDoodle from "@/components/CssDoodle/CssDoodle";

export const BioComponent = ({ page }: { page: PageProps }) => {
  const cookieStore = cookies();
  const userCookie = cookieStore.get("zoz_user");
  const user = userCookie ? JSON.parse(userCookie?.value) : undefined;
  const backgroundUrl = page?.backgroundUrl || null;
  const backGroundOpacity = page?.backGroundOpacity || defaultPage.bgOpacity;

  return (
    <>
      <div className="flex min-h-screen w-full flex-col items-center overflow-hidden">
        {backgroundUrl ? (
          <div className="fixed w-[100vh] h-[100vh] sm:w-screen sm:h-screen">
            <Image
              fill
              quality={90}
              priority={true}
              placeholder="empty"
              src={backgroundUrl}
              className="-z-50 -rotate-90 sm:rotate-0 object-contain scale-105 sm:scale-100 sm:object-cover"
              style={{
                opacity: backGroundOpacity,
                backgroundColor: "#080808",
                backgroundRepeat: "repeat",
                backgroundPosition: "center",
              }}
              alt={`${page.pagename} bio page background`}
              sizes="(max-width: 768px) 768px, (max-width: 1200px) 1200px, 1980px"
            />
          </div>
        ) : (
          <CssDoodle />
        )}
        <BioNavigation page={page} user={user} />
        <div className="relative container md:w-[42rem] flex w-full h-screen flex-col items-center overflow-y-auto">
          <div className="mt-28 relative select-none w-full flex flex-col sm:flex-row gap-3 sm:gap-2 sm:min-h-[12rem] flex-shrink-0">
            <BioAvatar page={page} />
            <BioCard page={page} className="w-full z-10 py-[0.6rem] px-3">
              <div className="flex w-full flex-col justify-center pt-3 sm:pt-0 sm:pl-[30%] gap-2 md:gap-1">
                <BioInfos page={page} />
                <BioBadges page={page} />
                <BioSocials page={page} />
              </div>
            </BioCard>
          </div>

          <div className="flex flex-col w-full gap-3 md:gap-2 my-2 mb-28">
            <BioLinks page={page} />
          </div>
        </div>
      </div>
    </>
  );
};
