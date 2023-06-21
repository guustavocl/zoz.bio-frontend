"use client";
import BioCard from "./BioCard";
import { memo, useState } from "react";
import { getIcon } from "@/utils/IconsList";
import { PageProps } from "@/types/PageProps";
import { LinkProps } from "@/types/LinkProps";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";
import { defaultPage } from "@/utils/BioVariables";
import BioIFrames from "./BioIFrames";
import BioLink from "./BioLink";
import BioArrowCard from "./BioArrowCard";

type BioLinksProps = {
  page: PageProps;
};

const BioLinks = ({ page }: BioLinksProps) => {
  const fontColor = page?.fontColor || defaultPage.fontColor;
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
          <div key={idx} className="w-full flex flex-row gap-2">
            <BioArrowCard page={page} className="w-2/4" arrowStart>
              <BioLink page={page} link={link} setFolderOwner={setFolderOwner} />
            </BioArrowCard>
            <BioArrowCard page={page} className="w-full -ml-6 md:-ml-8" arrowEnd>
              <BioLink page={page} link={link} setFolderOwner={setFolderOwner} />
            </BioArrowCard>
          </div>
        ) : (
          <BioIFrames key={idx} link={link} />
        )
      )}
    </>
  );
};

export default memo(BioLinks);
