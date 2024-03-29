"use client";
import BioIFrames from "@/app/(BioLayout)/[username]/BioIFrames";
import { LinkProps } from "@/types/LinkProps";
import { PageProps } from "@/types/PageProps";
import { Cog6ToothIcon, PlusIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { memo, useState } from "react";
import ButtonCard from "./ButtonCard";
import DialogNewLink from "./Dialogs/DialogNewLink";
import EditLink from "./EditLink";
import DialogEditLink from "./Dialogs/DialogEditLink";

type EditLinksProps = {
  page: PageProps;
};

const EditLinks = ({ page }: EditLinksProps) => {
  const [folderOwner, setFolderOwner] = useState<LinkProps | null>();
  const [selectedLink, setSelectedLink] = useState<LinkProps | null>();
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
        <div className="w-full flex flex-row select-none h-[3.5rem] md:h-auto">
          <EditLink
            page={page}
            link={folderOwner}
            setFolderOwner={link => {
              link.isSelected = false;
              setFolderOwner(null);
            }}
            editLink={() => {
              setSelectedLink(folderOwner);
            }}
          />
        </div>
      ) : null}
      {pageLinks.map((link, idx) =>
        link.embedded === "none" ? (
          <div key={idx} className="w-full flex flex-row select-none h-[3.5rem] md:h-auto">
            <EditLink
              page={page}
              link={link}
              setFolderOwner={setFolderOwner}
              editLink={() => {
                setSelectedLink(link);
              }}
            />
          </div>
        ) : (
          <div key={idx} className="w-full relative group">
            <div
              className={clsx(
                "z-50 absolute w-full h-[95%] flex flex-row justify-center opacity-60 md:opacity-0",
                "mb-2 pt-2 text-xl font-semibold rounded-lg cursor-pointer"
              )}
              onClick={() => {
                setSelectedLink(link);
              }}
            >
              <Cog6ToothIcon className="w-7 mr-2 self-start" /> <span>Click to Edit</span>
            </div>
            <div className="opacity-35 md:opacity-80 group-hover:opacity-30" onClick={() => setSelectedLink(link)}>
              <BioIFrames link={link} />
            </div>
          </div>
        )
      )}
      <DialogNewLink isOpen={dialogNewLink} setIsOpen={setDialogNewLink} page={page} />
      {selectedLink && (
        <DialogEditLink
          setSelectedLink={link => {
            setSelectedLink(link);
          }}
          page={page}
          link={selectedLink}
        />
      )}
    </>
  );
};

export default memo(EditLinks);
