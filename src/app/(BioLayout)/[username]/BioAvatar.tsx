import { memo } from "react";
import { RgbaColor } from "react-colorful";
import Image from "next/image";

//TODO - verify avatar ring, default avatar
const BioAvatar = ({ pfpUrl = "", color }: { pfpUrl?: string; color: RgbaColor }) => {
  return (
    <div className="flex min-w-fit flex-shrink-0 flex-col items-center justify-center p-2">
      <Image
        className="h-24 w-24 rounded-full border-[3px] object-cover hover:animate-pulse md:h-28 md:w-28 lg:h-32 lg:w-32"
        src={pfpUrl}
        width={100}
        height={100}
        quality={100}
        alt="bio page avatar"
        style={{
          borderColor: `rgb(${color.r},${color.g},${color.b},${color.a})`,
        }}
      />
    </div>
  );
};

export default memo(BioAvatar);
