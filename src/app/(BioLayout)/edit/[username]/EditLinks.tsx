"use client";
import { memo, useState } from "react";
import { getIcon } from "@/utils/IconsList";
import { PageProps } from "@/types/PageProps";
import { LinkProps } from "@/types/LinkProps";
import { ArrowLeftIcon, Cog6ToothIcon, PlusIcon } from "@heroicons/react/20/solid";
import { defaultPage } from "@/utils/BioVariables";
import BioCard from "@/app/(BioLayout)/[username]/BioCard";
import BioIFrames from "@/app/(BioLayout)/[username]/BioIFrames";
import ButtonCard from "./ButtonCard";
import DialogNewLink from "./Dialogs/DialogNewLink";
import EditLink from "./EditLink";
import clsx from "clsx";

type EditLinksProps = {
  page: PageProps;
};

const EditLinks = ({ page }: EditLinksProps) => {
  const fontColor = page?.fontColor || defaultPage.fontColor;
  const [folderOwner, setFolderOwner] = useState<LinkProps | null>();
  const [dialogNewLink, setDialogNewLink] = useState(false);

  const pageLinks = page?.pageLinks
    ? folderOwner
      ? page.pageLinks
          .filter(link => {
            return link.folderOwner === folderOwner._id;
          })
          .sort(function (a, b) {
            return a.position - b.position;
          })
      : page.pageLinks
          .filter(link => {
            return !link.folderOwner;
          })
          .sort(function (a, b) {
            return a.position - b.position;
          })
    : [];

  return (
    <>
      <div className="flex flex-row gap-2 w-full justify-center">
        <ButtonCard
          label="New Link"
          page={page}
          onClick={() => setDialogNewLink(true)}
          iconAdornment={<PlusIcon className="w-7 mr-2" />}
        />
        {page.subscription !== "none" && (
          <ButtonCard
            label="Config"
            page={page}
            onClick={() => console.log("click")}
            iconAdornment={<Cog6ToothIcon className="w-7 mr-2" />}
          />
        )}
      </div>
      {folderOwner ? (
        <BioCard page={page}>
          <div
            className="group flex h-full w-full cursor-pointer select-none flex-row flex-wrap items-center gap-4 pl-2 md:flex-nowrap"
            onClick={() => setFolderOwner(null)}
            style={{
              color: fontColor,
            }}
          >
            <img
              className="icon-shadow h-7 flex-shrink-0 opacity-60"
              src={getIcon(folderOwner.icon)?.icon}
              alt={`${folderOwner.icon} icon`}
              loading="lazy"
            />
            <h2 className="flex-1 flex-shrink-0 truncate whitespace-pre-wrap text-lg font-bold tracking-wide md:overflow-visible md:whitespace-nowrap md:text-xl">
              {folderOwner.label}
            </h2>
            <span className="hidden truncate group-hover:block">Click to go back</span>
            <ArrowLeftIcon className="h-5 flex-shrink-0" />
          </div>
        </BioCard>
      ) : null}
      {pageLinks.map((link, idx) =>
        link.embedded === "none" ? (
          <div key={idx} className="w-full flex flex-row gap-2 mb-2 select-none">
            <EditLink page={page} link={link} setFolderOwner={setFolderOwner} />
          </div>
        ) : (
          <div key={idx} className="w-full relative group">
            <div
              className={clsx(
                "z-50 absolute w-full h-[95%] flex flex-row justify-center opacity-60 md:opacity-0",
                "mb-2 pt-2 text-xl font-semibold rounded-lg cursor-pointer"
              )}
              onClick={() => console.log("edit iframe")}
            >
              <Cog6ToothIcon className="w-7 mr-2 self-start" /> <span>Click to Edit</span>
            </div>
            <div className="opacity-35 md:opacity-80 group-hover:opacity-30">
              <BioIFrames link={link} />
            </div>
          </div>
        )
      )}
      <DialogNewLink isOpen={dialogNewLink} setIsOpen={setDialogNewLink} page={page} />
    </>
  );
};

export default memo(EditLinks);
