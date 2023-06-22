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
        "absolute z-20 top-0 w-2/6 flex flex-col h-full",
        "arrow-card-avatar rounded-l-xl backdrop-saturate-150"
      )}
    >
      <Image className="object-cover rounded-l-xl opacity-80" src={pfpUrl} fill quality={90} alt="bio page avatar" />
    </div>
  );
};

export default memo(BioAvatar);
