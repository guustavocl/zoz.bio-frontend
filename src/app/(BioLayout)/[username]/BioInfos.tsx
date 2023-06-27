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
        className="flex flex-row items-center text-center text-3xl md:text-2xl font-bold leading-6 tracking-wide"
        style={{
          textShadow: "2px 2px #00000090",
          color: fontColor,
        }}
      >
        <span className="relative">
          {page?.uname || "No name~"}
          <span className="absolute -right-7 items-center h-full justify-center self-center flex flex-col top-0">
            {page?.adornment ? (
              <img
                className="w-6"
                src={getAdornmentIcon(page.adornment)?.icon}
                alt={getAdornmentIcon(page.adornment)?.label}
                loading="lazy"
              />
            ) : null}
          </span>
        </span>
      </h2>
      <div
        className="-mt-[0.2rem] md:-mt-[0.4rem] cursor-pointer text-lg md:text-sm font-semibold tracking-wide"
        style={{
          color: fontColor,
          opacity: 0.5,
        }}
      >
        <CopyLabel label={`zoz.bio/${page?.pagename}`} textToCopy={`https://zoz.bio/${page?.pagename}`} />
      </div>
      {page?.bio && (
        <div
          className="mt-0.5 w-full text-center text-ellipsis break-words text-base md:text-sm font-semibold tracking-tight opacity-80"
          style={{
            lineHeight: "0.9rem",
            color: fontColor,
          }}
        >
          {page?.bio}
        </div>
      )}
    </div>
  );
};

export default memo(BioInfos);
