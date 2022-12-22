import React from "react";
import ZozTooltip from "../../components/Tooltip";
import { useToasts } from "../../context/ToastProvider/useToasts";
import { getSocialIcon } from "./IconsList";

type MediaProps = {
  username: string;
  key: string;
};

type PageIconProps = {
  media: MediaProps;
};

const PageIcon = ({ media }: PageIconProps) => {
  const social = getSocialIcon(media.key);
  const { successToast } = useToasts();
  if (!social) return null;
  return (
    <div className="cursor-pointer group">
      <ZozTooltip
        label={social.label}
        className="-translate-x-6 -translate-y-8"
      />
      {social.url ? (
        <a
          className="hover:animate-pulse"
          href={`${social.url(media.username)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="h-7 icon-shadow"
            src={social.icon}
            alt={`${media.key} icon`}
            loading="lazy"
          />
        </a>
      ) : (
        <img
          className="h-7 icon-shadow hover:animate-pulse"
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
    </div>
  );
};

export default React.memo(PageIcon);
