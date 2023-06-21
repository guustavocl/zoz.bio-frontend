import { PageProps } from "@/types/PageProps";
import { defaultPage } from "@/utils/BioVariables";
import Image from "next/image";
import { memo } from "react";

//TODO - verify avatar ring, default avatar
const BioAvatar = ({ pfpUrl = "", page }: { pfpUrl?: string; page: PageProps }) => {
  const secondaryColor = page?.secondaryColor || defaultPage.secondaryColor;

  return (
    <div className="flex min-w-fit flex-shrink-0 flex-col items-center justify-center p-2">
      <Image
        className="h-24 w-24 rounded-full border-[3px] object-cover hover:animate-pulse md:h-28 md:w-28 lg:h-32 lg:w-32"
        src={pfpUrl}
        width={500}
        height={500}
        quality={90}
        alt="bio page avatar"
        style={{
          borderColor: `rgb(${secondaryColor.r},${secondaryColor.g},${secondaryColor.b},${secondaryColor.a})`,
        }}
      />
    </div>
  );
};

export default memo(BioAvatar);
