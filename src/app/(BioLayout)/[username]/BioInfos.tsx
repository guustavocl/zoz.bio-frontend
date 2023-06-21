import { memo } from "react";
import { PageProps } from "@/types/PageProps";
import { getAdornmentIcon } from "@/utils/IconsList";
import CopyLabel from "@/components/Labels/CopyLabel";
import { defaultPage } from "@/utils/BioVariables";

const BioInfos = ({ page }: { page: PageProps }) => {
  const fontColor = page?.fontColor || defaultPage.fontColor;

  return (
    <div className="flex w-full flex-col items-center">
      <h2
        className="flex flex-row items-center text-center text-2xl font-bold leading-6 tracking-wide"
        style={{
          textShadow: "2px 2px #00000090",
          color: fontColor,
        }}
      >
        {page?.uname || "No name~"}
        {page?.adornment ? (
          <img
            className="w-7"
            src={getAdornmentIcon(page.adornment)?.icon}
            alt={getAdornmentIcon(page.adornment)?.label}
            loading="lazy"
          />
        ) : null}
      </h2>
      <div
        className="-mt-1"
        style={{
          color: fontColor,
          opacity: 0.5,
        }}
      >
        <CopyLabel label={`zoz.bio/${page?.pagename}`} textToCopy={`https://zoz.bio/${page?.pagename}`} />
      </div>
      <div
        className="mt-2 flex flex-col items-center break-words text-center text-sm font-semibold tracking-tight opacity-70"
        style={{
          lineHeight: "0.9rem",
          color: fontColor,
        }}
      >
        {page?.bio}
      </div>
    </div>
  );
};

export default memo(BioInfos);
