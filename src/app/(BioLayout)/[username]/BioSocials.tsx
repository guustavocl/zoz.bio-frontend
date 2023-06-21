import { memo } from "react";
import BioIcon from "./BioIcon";
import { PageProps } from "@/types/PageProps";
import { defaultPage } from "@/utils/BioVariables";

const BioSocials = ({ page }: { page: PageProps }) => {
  const socialMedias = page?.socialMedias?.length > 0 ? page.socialMedias : defaultPage.pageSocialMedias;
  return (
    <div className="mt-1 flex flex-row flex-wrap items-center justify-center gap-1">
      {socialMedias && socialMedias.map((media, idx) => <BioIcon key={idx} media={media} />)}
    </div>
  );
};
export default memo(BioSocials);
