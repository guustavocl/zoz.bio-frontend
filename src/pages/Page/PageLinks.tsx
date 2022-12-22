import React, { useState } from "react";
import { IPage } from "../../types/IPage";
import { getIcon } from "./IconsList";
import {
  ArrowUpRightIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from "@heroicons/react/20/solid";
import SectionCard from "./SectionCard";
import { ILink } from "../../types/ILink";

type PageLinksProps = {
  page: IPage;
};

const PageLinks = ({ page }: PageLinksProps) => {
  const [folderOwner, setFolderOwner] = useState<ILink | null>();

  let pageLinks = page?.pageLinks
    ? folderOwner
      ? page.pageLinks
          .filter((link) => {
            return link.folderOwner === folderOwner._id;
          })
          .sort(function (a, b) {
            return a.position - b.position;
          })
      : page.pageLinks
          .filter((link) => {
            return !link.folderOwner;
          })
          .sort(function (a, b) {
            return a.position - b.position;
          })
    : [];

  return (
    <React.Fragment>
      {folderOwner ? (
        <SectionCard page={page}>
          <div
            className="pl-2 w-full h-full group flex flex-row gap-4 flex-wrap md:flex-nowrap items-center page-font-color cursor-pointer select-none"
            onClick={() => setFolderOwner(null)}
          >
            <img
              className="h-7 icon-shadow opacity-60 flex-shrink-0"
              src={getIcon(folderOwner.icon)?.icon}
              alt={`${folderOwner.icon} icon`}
              loading="lazy"
            />
            <h2 className="text-lg md:text-xl font-bold tracking-wide flex-1 flex-shrink-0 truncate md:overflow-visible whitespace-pre-wrap md:whitespace-nowrap">
              {folderOwner.label}
            </h2>
            <span className="hidden group-hover:block truncate">
              Click to go back
            </span>
            <ArrowLeftIcon className="h-5 flex-shrink-0" />
          </div>
        </SectionCard>
      ) : null}
      {pageLinks.map((link, idx) =>
        link.embedded === "none" ? (
          <React.Fragment key={idx}>
            {link.isFolder ? (
              <SectionCard page={page}>
                <div
                  className="pl-2 w-full h-full group flex flex-row gap-4 flex-wrap md:flex-nowrap items-center page-font-color cursor-pointer select-none"
                  onClick={() => setFolderOwner(link)}
                >
                  <img
                    className="h-7 icon-shadow opacity-60 flex-shrink-0"
                    src={getIcon(link.icon)?.icon}
                    alt={`${link.icon} icon`}
                    loading="lazy"
                  />
                  <h2 className="text-lg md:text-xl font-bold tracking-wide flex-1 flex-shrink-0 truncate md:overflow-visible whitespace-pre-wrap md:whitespace-nowrap">
                    {link.label}
                  </h2>
                  <span className="hidden group-hover:block truncate">
                    Click to open
                  </span>
                  <ArrowRightIcon className="h-5 flex-shrink-0" />
                </div>
              </SectionCard>
            ) : (
              <SectionCard page={page}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pl-2 w-full h-full group flex flex-row gap-4 flex-wrap md:flex-nowrap items-center page-font-color"
                >
                  <img
                    className="h-7 icon-shadow opacity-60 flex-shrink-0"
                    src={getIcon(link.icon)?.icon}
                    alt={`${link.icon} icon`}
                    loading="lazy"
                  />
                  <h2 className="text-lg md:text-xl font-bold tracking-wide flex-1 flex-shrink-0 truncate md:overflow-visible whitespace-pre-wrap md:whitespace-nowrap">
                    {link.label}
                  </h2>
                  <span className="hidden group-hover:block truncate">
                    {link.url}
                  </span>
                  <ArrowUpRightIcon className="h-5 flex-shrink-0" />
                </a>
              </SectionCard>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <div
              className={
                "relative flex flex-col " +
                "w-full sm:w-5/6 md:w-3/4 lg:w-3/5 lg:max-w-2xl " +
                "mb-2 rounded-xl shadow-black "
              }
            >
              <iframe
                style={{
                  borderRadius: "16px",
                  // height: 80,
                  overflow: "hidden",
                  backgroundColor: "#000",
                }}
                className="h-20 w-full rounded"
                src="https://open.spotify.com/embed/track/1lM1ZHTvfKi5CMRjsZ4Sg9?utm_source=generator"
                width="100%"
                loading="lazy"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              ></iframe>
            </div>
            {/* <div id="embed-iframe"></div> */}
          </React.Fragment>
        )
      )}
    </React.Fragment>
  );
};

export default React.memo(PageLinks);
