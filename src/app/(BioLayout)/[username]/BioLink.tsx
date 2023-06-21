import { LinkProps } from "@/types/LinkProps";
import { PageProps } from "@/types/PageProps";
import { defaultPage } from "@/utils/BioVariables";
import Link from "next/link";
import { memo } from "react";

type BioLinkProps = {
  page: PageProps;
  link: LinkProps;
  setFolderOwner: (link: LinkProps) => void;
};

const BioLink = ({ page, link, setFolderOwner }: BioLinkProps) => {
  const fontColor = page?.fontColor || defaultPage.fontColor;
  const h2ClassName =
    "flex-1 flex-shrink-0 truncate whitespace-pre-wrap text-center text-lg font-bold tracking-wide md:overflow-visible md:whitespace-nowrap md:text-xl";

  if (link.isFolder)
    return (
      <div
        className="group flex h-full w-full cursor-pointer select-none flex-row flex-wrap items-center gap-4 pl-2 md:flex-nowrap"
        onClick={() => setFolderOwner(link)}
      >
        <h2 className={h2ClassName} style={{ color: fontColor }}>
          {link.label}
        </h2>
      </div>
    );
  return (
    <Link href={link.url} rel="noopener noreferrer">
      <h2 className={h2ClassName} style={{ color: fontColor }}>
        {link.label}
      </h2>
    </Link>
  );
};
export default memo(BioLink);
