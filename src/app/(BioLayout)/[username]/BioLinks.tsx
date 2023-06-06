import SectionCard from "./BioCard";
import { memo, useState } from "react";
import { getIcon } from "@/utils/IconsList";
import { PageProps } from "@/types/PageProps";
import { LinkProps } from "@/types/LinkProps";
import { ArrowUpRightIcon, ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/20/solid";

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
    <>
      {folderOwner ? (
        <SectionCard page={page}>
          <div
            className="page-font-color group flex h-full w-full cursor-pointer select-none flex-row flex-wrap items-center gap-4 pl-2 md:flex-nowrap"
            onClick={() => setFolderOwner(null)}
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
        </SectionCard>
      ) : null}
      {pageLinks.map((link, idx) =>
        link.embedded === "none" ? (
          <>
            {link.isFolder ? (
              <SectionCard key={idx} page={page}>
                <div
                  className="page-font-color group flex h-full w-full cursor-pointer select-none flex-row flex-wrap items-center gap-4 pl-2 md:flex-nowrap"
                  onClick={() => setFolderOwner(link)}
                >
                  <img
                    className="icon-shadow h-7 flex-shrink-0 opacity-60"
                    src={getIcon(link.icon)?.icon}
                    alt={`${link.icon} icon`}
                    loading="lazy"
                  />
                  <h2 className="flex-1 flex-shrink-0 truncate whitespace-pre-wrap text-lg font-bold tracking-wide md:overflow-visible md:whitespace-nowrap md:text-xl">
                    {link.label}
                  </h2>
                  <span className="hidden truncate group-hover:block">Click to open</span>
                  <ArrowRightIcon className="h-5 flex-shrink-0" />
                </div>
              </SectionCard>
            ) : (
              <SectionCard page={page}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="page-font-color group flex h-full w-full flex-row flex-wrap items-center gap-4 pl-2 md:flex-nowrap"
                >
                  <img
                    className="icon-shadow h-7 flex-shrink-0 opacity-60"
                    src={getIcon(link.icon)?.icon}
                    alt={`${link.icon} icon`}
                    loading="lazy"
                  />
                  <h2 className="flex-1 flex-shrink-0 truncate whitespace-pre-wrap text-lg font-bold tracking-wide md:overflow-visible md:whitespace-nowrap md:text-xl">
                    {link.label}
                  </h2>
                  <span className="hidden truncate md:group-hover:block">{link.url}</span>
                  <ArrowUpRightIcon className="h-5 flex-shrink-0" />
                </a>
              </SectionCard>
            )}
          </>
        ) : (
          <>
            <div
              key={idx}
              className={
                "relative flex flex-col " +
                "w-full sm:w-5/6 md:w-3/4 lg:w-3/5 lg:max-w-2xl " +
                "rounded-xl shadow-black "
              }
            >
              {link.embedded === "spotify" && link.url.includes("playlist") ? (
                <iframe
                  className="mb-2 h-36 w-full rounded"
                  src={`https://open.spotify.com/embed/playlist/${link.url}`}
                  width="100%"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                ></iframe>
              ) : link.embedded === "spotify" ? (
                <iframe
                  className="mb-0.5 h-20 w-full rounded"
                  src={`https://open.spotify.com/embed/track/${link.url}`}
                  width="100%"
                  height="auto"
                  loading="lazy"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                ></iframe>
              ) : link.embedded === "soundcloud" && link.url.includes("/sets/") ? (
                <iframe
                  className="mb-1.5 w-full rounded"
                  width="100%"
                  height="300"
                  loading="lazy"
                  frameBorder="0"
                  src={`https://w.soundcloud.com/player/?url=https://soundcloud.com${link.url}`}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                ></iframe>
              ) : link.embedded === "soundcloud" ? (
                <iframe
                  className="mb-1.5 w-full rounded"
                  width="100%"
                  height="125"
                  loading="lazy"
                  frameBorder="0"
                  src={`https://w.soundcloud.com/player/?url=https://soundcloud.com${link.url}`}
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                ></iframe>
              ) : link.embedded === "youtube" && link.url.length > 20 ? (
                <iframe
                  className="mb-1.5 w-full rounded"
                  width="100%"
                  height="250"
                  src={`https://www.youtube.com/embed/videoseries?controls=0&amp;list=${link.url}&autoplay=0&origin=https://zoz.bio&rel=0&fs=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              ) : link.embedded === "youtube" ? (
                <iframe
                  className="mb-1.5 w-full rounded"
                  width="100%"
                  height="250"
                  loading="lazy"
                  frameBorder="0"
                  src={`https://www.youtube.com/embed/${link.url}?autoplay=0&origin=https://zoz.bio&rel=0&fs=0`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              ) : null}
            </div>
          </>
        )
      )}
    </>
  );
};

export default memo(PageLinks);