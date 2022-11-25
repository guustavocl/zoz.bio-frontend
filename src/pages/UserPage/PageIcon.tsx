import React from "react";
import { useToasts } from "../../context/ToastProvider/useToasts";
import { getIcon } from "./IconsList";

type MediaProps = {
  username: string;
  key: string;
};

type PageIconProps = {
  media: MediaProps;
};

const PageIcon = ({ media }: PageIconProps) => {
  const social = getIcon(media.key);
  const { successToast } = useToasts();
  if (!social) return null;
  return (
    <div className="cursor-pointer group">
      <span
        className="z-10 select-none hidden absolute group-hover:flex transition-opacity text-sm font-mono text-gray-100 backdrop-blur-3xl rounded-sm px-3 py-1 -translate-x-6 -translate-y-8"
        style={{ backgroundColor: "#00000099" }}
      >
        {social.label}
      </span>
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
