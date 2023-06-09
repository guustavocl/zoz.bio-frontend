import { memo } from "react";
import { PageProps } from "@/types/PageProps";
import { getAdornmentIcon } from "@/utils/IconsList";
import { successToast } from "@/utils/toaster";

type PageInfosProps = {
  page: PageProps;
};

const PageInfos = ({ page }: PageInfosProps) => {
  return (
    <>
      <div className="flex w-full flex-col items-center">
        <h2
          className="page-font-color flex flex-row items-center text-center text-2xl font-bold leading-6 tracking-wide"
          style={{
            textShadow: "2px 2px #00000090",
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
        <span
          className="hsecondary -mt-1 cursor-pointer text-sm font-semibold tracking-wide"
          onClick={() => {
            successToast(`Copied`);
            if (navigator.clipboard) {
              navigator.clipboard.writeText(`https://zoz.bio/${page?.pagename || ""}`);
            }
          }}
        >
          {`zoz.bio/${page?.pagename || ""}`}
        </span>
        <div
          className="page-font-color mt-3 flex flex-col items-center break-words text-center text-sm font-semibold tracking-tight opacity-70"
          style={{
            lineHeight: "0.9rem",
          }}
        >
          {page?.bio}
        </div>
      </div>
    </>
  );
};

export default memo(PageInfos);
