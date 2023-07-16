import { memo } from "react";
import { PageStatusProps } from "@/types/PageProps";
import { getStatusIcon } from "@/utils/IconsList";

const BioStatusIcon = ({ status }: { status: PageStatusProps }) => {
  const statusIcon = getStatusIcon(status.key);
  return statusIcon ? (
    <div className="absolute left-2 z-30 top-2 flex flex-row opacity-50 hover:opacity-100">
      <img className="w-7" src={statusIcon.icon} alt={statusIcon.label} loading="lazy" />
    </div>
  ) : null;
};

export default memo(BioStatusIcon);
