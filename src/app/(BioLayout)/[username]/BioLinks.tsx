"use client";
import { LinkProps } from "@/types/LinkProps";
import { PageProps } from "@/types/PageProps";
import { memo, useState } from "react";
import BioIFrames from "./BioIFrames";
import BioLink from "./BioLink";

type BioLinksProps = {
  page: PageProps;
};

const BioLinks = ({ page }: BioLinksProps) => {
  const [folderOwner, setFolderOwner] = useState<LinkProps | null>();

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
      {folderOwner ? (
        <div className="w-full flex flex-row gap-2 mb-2 select-none">
          <BioLink
            page={page}
            link={folderOwner}
            setFolderOwner={link => {
              link.isSelected = false;
              setFolderOwner(null);
            }}
          />
        </div>
      ) : null}
      {pageLinks.map((link, idx) =>
        link.embedded === "none" ? (
          <div key={idx} className="w-full flex flex-row gap-2 mb-2 select-none">
            <BioLink page={page} link={link} setFolderOwner={setFolderOwner} />
          </div>
        ) : (
          <BioIFrames key={idx} link={link} />
        )
      )}
    </>
  );
};

export default memo(BioLinks);
