"use client";
import { DefaultTooltip } from "@/components/Tooltip";
import { getBadge } from "@/utils/IconsList";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { memo, useState } from "react";
import { RgbaColor } from "react-colorful";
import DialogEditBadges from "./Dialogs/DialogEditBadges";
import { PageProps } from "@/types/PageProps";

const EditBadges = ({ page, badges, color }: { page: PageProps; badges?: string[]; color: RgbaColor }) => {
  const [dialogEditBadges, setDialogEditBadges] = useState(false);

  return (
    <DefaultTooltip content="Click to edit your badges">
      <div
        className="group flex flex-row cursor-pointer hover:ring-2 rounded-md hover:backdrop-contrast-150 hover:ring-white/80"
        onClick={() => {
          setDialogEditBadges(true);
        }}
      >
        <div className="py-2 flex w-full flex-row flex-wrap justify-center gap-2 items-center">
          {badges &&
            badges.map((badge, idx) =>
              getBadge(badge) ? (
                <span
                  key={idx}
                  className="whitespace-nowrap rounded px-1 py-0.5 text-xs font-semibold shadow-sm shadow-black/50 border-[1.5px]"
                  style={{
                    borderColor: `rgb(${color.r},${color.g},${color.b},${color.a})`,
                  }}
                >
                  {getBadge(badge)?.label}
                </span>
              ) : null
            )}
        </div>
        <PencilSquareIcon className="absolute right-3 h-6 text-center group-hover:right-1 self-center" />
      </div>
      <DialogEditBadges isOpen={dialogEditBadges} setIsOpen={setDialogEditBadges} page={page} />
    </DefaultTooltip>
  );
};
export default memo(EditBadges);
