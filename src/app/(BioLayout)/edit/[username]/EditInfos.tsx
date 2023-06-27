"use client";
import { memo, useState } from "react";
import { PageProps } from "@/types/PageProps";
import { getAdornmentIcon } from "@/utils/IconsList";
import DialogEditInfos from "./Dialogs/DialogEditInfos";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { DefaultTooltip } from "@/components/Tooltip";
import { defaultPage } from "@/utils/BioVariables";

const EditInfos = ({ page }: { page: PageProps }) => {
  const fontColor = page?.fontColor || defaultPage.fontColor;
  const [dialogEditInfos, setDialogEditInfos] = useState(false);

  return (
    <DefaultTooltip content="Click to edit your infos">
      <div
        className="group flex flex-row cursor-pointer hover:ring-2 rounded-md hover:backdrop-contrast-150 hover:ring-white/80"
        onClick={() => {
          setDialogEditInfos(true);
        }}
      >
        <div className="flex w-full flex-col items-center">
          <h2
            className="flex flex-row items-center text-center text-3xl md:text-2xl font-bold leading-6 tracking-wide"
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
          <span
            className={"-mt-[0.2rem] md:-mt-[0.6rem] cursor-pointer text-lg md:text-sm font-semibold tracking-wide"}
            style={{
              color: fontColor,
              opacity: 0.5,
            }}
          >
            zoz.bio/{page?.pagename}
          </span>
          <div
            className="mt-0.5 flex flex-col items-center break-words text-center text-base md:text-sm font-semibold tracking-tight opacity-70"
            style={{
              lineHeight: "0.9rem",
              color: fontColor,
            }}
          >
            {page?.bio}
          </div>
        </div>
        <PencilSquareIcon className="absolute right-3 h-6 text-center group-hover:right-1" />
      </div>
      <DialogEditInfos isOpen={dialogEditInfos} setIsOpen={setDialogEditInfos} page={page} />
    </DefaultTooltip>
  );
};

export default memo(EditInfos);
