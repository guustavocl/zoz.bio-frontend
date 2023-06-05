import { memo } from "react";
// import ZozTooltip from "../../components/Tooltip";
// import { useToasts } from "../../context/ToastProvider/useToasts";
import { getSocialIcon } from "@/utils/IconsList";

type MediaProps = {
  username: string;
  key: string;
};

type PageIconProps = {
  media: MediaProps;
};

const PageIcon = ({ media }: PageIconProps) => {
  const social = getSocialIcon(media.key);
  // const { successToast } = useToasts();
  if (!social) return null;
  return (
    <div className="group cursor-pointer">
      {/* TODO TIPSY */}
      {/* <ZozTooltip label={social.label} className="-translate-x-6 -translate-y-8" /> */}
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
          className="icon-shadow h-7 hover:animate-pulse"
          src={social.icon}
          alt={`${media.key} icon`}
          onClick={() => {
            // successToast(`Copied: ${media.username}`);
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

export default memo(PageIcon);
