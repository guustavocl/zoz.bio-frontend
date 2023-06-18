import { memo } from "react";
import BioIcon from "./BioIcon";
import { PagePropsSocialMedia } from "@/types/PageProps";

const BioSocials = ({ socialMedias }: { socialMedias?: PagePropsSocialMedia[] }) => {
  return (
    <div className="mt-1 flex flex-row flex-wrap items-center justify-center gap-1">
      {socialMedias && socialMedias.map((media, idx) => <BioIcon key={idx} media={media} />)}
    </div>
  );
};
export default memo(BioSocials);
