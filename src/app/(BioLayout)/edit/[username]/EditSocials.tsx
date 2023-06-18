"use client";
import BioIcon from "@/app/(BioLayout)/[username]/BioIcon";
import { DefaultTooltip } from "@/components/Tooltip";
import { PageProps, PagePropsSocialMedia } from "@/types/PageProps";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { memo, useState } from "react";
import DialogEditSocials from "./Dialogs/DialogEditSocials";

const EditSocials = ({ page, socialMedias }: { page: PageProps; socialMedias?: PagePropsSocialMedia[] }) => {
  const [dialogEditSocials, setDialogEditSocials] = useState(false);

  return (
    <DefaultTooltip content="Click to edit your accounts">
      <div
        className="group flex flex-row cursor-pointer hover:ring-2 rounded-md hover:backdrop-contrast-150 hover:ring-white/80"
        onClick={() => {
          setDialogEditSocials(true);
        }}
      >
        <div className="mt-1 flex flex-row flex-wrap w-full items-center justify-center gap-1">
          {socialMedias && socialMedias.map((media, idx) => <BioIcon key={idx} media={media} />)}
        </div>
        <PencilSquareIcon className="absolute right-3 h-6 text-center group-hover:right-1 self-center" />
      </div>
      <DialogEditSocials isOpen={dialogEditSocials} setIsOpen={setDialogEditSocials} page={page} />
    </DefaultTooltip>
  );
};
export default memo(EditSocials);
