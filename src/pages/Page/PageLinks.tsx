import React, { useState } from "react";
import { PageProps } from "../../types/PageProps";
import { getIcon } from "./IconsList";
import { ArrowUpRightIcon, ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";
import SectionCard from "./SectionCard";
import { LinkProps } from "../../types/LinkProps";

type PageLinksProps = {
  page: PageProps;
};

const PageLinks = ({ page }: PageLinksProps) => {
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
            <span className="hidden group-hover:block truncate">Click to go back</span>
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
                  <span className="hidden group-hover:block truncate">Click to open</span>
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
                  <span className="hidden md:group-hover:block truncate">{link.url}</span>
                  <ArrowUpRightIcon className="h-5 flex-shrink-0" />
                </a>
              </SectionCard>
            )}
          </React.Fragment>
        ) : (
          <React.Fragment key={idx}>
            <div
              className={
                "relative flex flex-col " +
                "w-full sm:w-5/6 md:w-3/4 lg:w-3/5 lg:max-w-2xl " +
                "rounded-xl shadow-black "
              }
            >
              {link.embedded === "spotify" && link.url.includes("playlist") ? (
                <iframe
                  className="h-36 w-full rounded mb-2"
                  src={`https://open.spotify.com/embed/playlist/${link.url}`}
                  width="100%"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              ) : link.embedded === "spotify" ? (
                <iframe
                  className="h-20 w-full rounded mb-0.5"
                  src={`https://open.spotify.com/embed/track/${link.url}`}
                  width="100%"
                  height="auto"
                  loading="lazy"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                ></iframe>
              ) : link.embedded === "soundcloud" && link.url.includes("/sets/") ? (
                <iframe
                  className="w-full rounded mb-1.5"
                  width="100%"
                  height="300"
                  loading="lazy"
                  frameBorder="0"
                  src={`https://w.soundcloud.com/player/?url=https://soundcloud.com${link.url}`}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                ></iframe>
              ) : link.embedded === "soundcloud" ? (
                <iframe
                  className="w-full rounded mb-1.5"
                  width="100%"
                  height="125"
                  loading="lazy"
                  frameBorder="0"
                  src={`https://w.soundcloud.com/player/?url=https://soundcloud.com${link.url}`}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                ></iframe>
              ) : link.embedded === "youtube" && link.url.length > 20 ? (
                <iframe
                  className="w-full rounded mb-1.5"
                  width="100%"
                  height="250"
                  src={`https://www.youtube.com/embed/videoseries?controls=0&amp;list=${link.url}&autoplay=0&origin=https://zoz.gg&rel=0&fs=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              ) : link.embedded === "youtube" ? (
                <iframe
                  className="w-full rounded mb-1.5"
                  width="100%"
                  height="250"
                  loading="lazy"
                  frameBorder="0"
                  src={`https://www.youtube.com/embed/${link.url}?autoplay=0&origin=https://zoz.gg&rel=0&fs=0`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              ) : null}
            </div>
          </React.Fragment>
        )
      )}
    </React.Fragment>
  );
};

export default React.memo(PageLinks);
