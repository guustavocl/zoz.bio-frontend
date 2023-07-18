import { PageProps } from "@/types/PageProps";
import { defaultPage } from "@/utils/BioVariables";
import { twMerge } from "tailwind-merge";
import { memo } from "react";
import Image from "next/image";

type SectionCardProps = {
  page?: PageProps;
  className?: string;
};

const BioAvatar = ({ page }: SectionCardProps) => {
  const cardBlur = page?.cardBlur || defaultPage.cardBlur;
  const cardHueRotate = page?.cardHueRotate || defaultPage.cardHueRotate;
  const pfpUrl = page?.pfpUrl || defaultPage.pfpUrl;
  const primaryColor = page?.primaryColor || defaultPage.primaryColor;

  return (
    <div
      className={twMerge(
        cardBlur,
        cardHueRotate,
        "relative sm:absolute z-20 -mb-6 sm:mb-0 sm:top-0 w-full sm:w-2/6 flex flex-col h-40 sm:h-full items-center justify-center",
        "arrow-card-avatar rounded-t-xl sm:rounded-tr-none sm:rounded-l-xl backdrop-saturate-150 shadow-sm shadow-black"
      )}
    >
      <Image
        fill
        quality={90}
        priority={true}
        src={pfpUrl}
        className="z-20 object-cover rounded-t-xl sm:rounded-tr-none sm:rounded-l-xl opacity-10 sm:opacity-80"
        alt="bio page avatar"
        placeholder="empty"
        sizes="(max-width: 768px) 250px, (max-width: 1200px) 350px, 400px"
      />
      <div className="z-30 w-full h-full flex rounded-t-xl sm:hidden flex-col items-center justify-center bg-opacity-0 backdrop-blur-3xl">
        <Image
          quality={90}
          width={200}
          height={200}
          priority={true}
          src={pfpUrl}
          className="h-[9.5rem] w-[9.5rem] z-20 rounded-full sm:rounded-tr-none sm:rounded-l-xl opacity-90 border-4"
          style={{ borderColor: `rgb(${primaryColor.r},${primaryColor.g},${primaryColor.b},0.8)` }}
          alt="bio page avatar"
          placeholder="empty"
          sizes="(max-width: 768px) 250px, (max-width: 1200px) 350px, 400px"
        />
      </div>
    </div>
  );
};

export default memo(BioAvatar);
