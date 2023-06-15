"use client";
import { memo, useState } from "react";
import { PageProps } from "@/types/PageProps";
import { getAdornmentIcon } from "@/utils/IconsList";
import DialogEditInfos from "./Dialogs/DialogEditInfos";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { DefaultTooltip } from "@/components/Tooltip";

const EditInfos = ({ page }: { page: PageProps }) => {
  const [dialogEditInfos, setDialogEditInfos] = useState(false);

  return (
    <DefaultTooltip content="Click to edit your infos">
      <div
        className="flex flex-row cursor-pointer hover:ring-2 rounded-md hover:backdrop-contrast-150 hover:ring-white"
        onClick={() => {
          setDialogEditInfos(true);
        }}
      >
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
          <span className={"hsecondary cursor-pointer text-sm -mt-1 font-semibold tracking-wide"}>
            zoz.bio/{page?.pagename}
          </span>
          <div
            className="page-font-color mt-2 flex flex-col items-center break-words text-center text-sm font-semibold tracking-tight opacity-70"
            style={{
              lineHeight: "0.9rem",
            }}
          >
            {page?.bio}
          </div>
        </div>
        <PencilSquareIcon className="h-6 text-center" />
      </div>
      <DialogEditInfos isOpen={dialogEditInfos} setIsOpen={setDialogEditInfos} page={page} />
    </DefaultTooltip>
  );
};

export default memo(EditInfos);
