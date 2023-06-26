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

  return (
    <div
      className={twMerge(
        cardBlur,
        cardHueRotate,
        "sm:absolute z-20 -mb-3 sm:mb-0 sm:top-0 w-full sm:w-2/6 sm:flex flex-col h-40 sm:h-full",
        "arrow-card-avatar rounded-t-xl sm:rounded-tr-none sm:rounded-l-xl backdrop-saturate-150"
      )}
    >
      <Image
        fill
        quality={90}
        priority={true}
        src={pfpUrl}
        className="z-20 object-cover rounded-t-xl sm:rounded-tr-none sm:rounded-l-xl opacity-80"
        alt="bio page avatar"
        placeholder="empty"
        sizes="(max-width: 768px) 250px, (max-width: 1200px) 350px, 400px"
      />
    </div>
  );
};

export default memo(BioAvatar);
