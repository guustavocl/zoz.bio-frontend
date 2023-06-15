"use client";
import { memo } from "react";
import { getSocialIcon } from "@/utils/IconsList";
import { successToast } from "@/utils/toaster";
import { Tooltip } from "@/components/Tooltip";

type MediaProps = {
  username: string;
  key: string;
};

// TODO - next/image and try to ssr this
const BioIcon = ({ media }: { media: MediaProps }) => {
  const social = getSocialIcon(media.key);
  if (!social) return null;
  return (
    <Tooltip
      content={social.label}
      className="group"
      backgroundColor="black"
      bgVariable="--page-primary-color"
      textVariable="--page-font-color"
    >
      {social.url ? (
        <a
          className="hover:animate-pulse"
          href={`${social.url(media.username)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img className="icon-shadow h-7" src={social.icon} alt={`${media.key} icon`} loading="lazy" />
        </a>
      ) : (
        <img
          className="icon-shadow h-7 cursor-pointer hover:animate-pulse"
          src={social.icon}
          alt={`${media.key} icon`}
          onClick={() => {
            successToast(`Copied: ${media.username}`);
            if (navigator.clipboard) {
              navigator.clipboard.writeText(media.username);
            }
          }}
          loading="lazy"
        />
      )}
    </Tooltip>
  );
};

export default memo(BioIcon);
