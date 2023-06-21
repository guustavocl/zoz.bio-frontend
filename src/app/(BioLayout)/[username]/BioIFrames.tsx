import { LinkProps } from "@/types/LinkProps";
import { memo } from "react";

const BioIFrames = ({ link }: { link: LinkProps }) => {
  return (
    <div className="relative flex flex-col w-full rounded-xl shadow-black">
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
  );
};
export default memo(BioIFrames);
