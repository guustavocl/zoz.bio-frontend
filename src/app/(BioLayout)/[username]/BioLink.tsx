import { LinkProps } from "@/types/LinkProps";
import { PageProps } from "@/types/PageProps";
import { defaultPage } from "@/utils/BioVariables";
import { getIcon } from "@/utils/IconsList";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

type BioLinkProps = {
  page: PageProps;
  link: LinkProps;
  setFolderOwner: (link: LinkProps) => void;
};

const BannerComponent = ({ link, fontColor }: { link: LinkProps; fontColor: string }) => {
  const typeCover = link.isFolder ? "" : "/banners/link-zelda.jpg";

  return (
    <>
      {typeCover && (
        <Image
          src={typeCover}
          fill
          className="object-cover hover:animate-pulse rounded-l-xl opacity-60"
          quality={30}
          alt="link banner"
        />
      )}
      <div
        className="z-10 flex flex-row sm:items-center gap-2 sm:ml-[10%] md:ml-[15%] text-sm sm:text-xl font-bold leading-6 tracking-wide icon-shadow"
        style={{ color: fontColor }}
      >
        <img
          className="icon-shadow h-5 sm:h-7 flex-shrink-0"
          src={getIcon(link.isFolder ? "folder" : "link")?.icon}
          alt={`folder icon`}
          loading="lazy"
        />
        {link.isFolder ? "Folder" : "Link"}
      </div>
    </>
  );
};

const LinkComponent = ({ page, link, setFolderOwner }: BioLinkProps) => {
  const fontColor = page?.fontColor || defaultPage.fontColor;
  const h2ClassName =
    "sm:ml-7 flex-1 flex-shrink-0 truncate whitespace-pre-wrap text-center font-bold tracking-wide overflow-visible whitespace-nowrap sm:text-xl";

  if (link.isFolder)
    return (
      <div className="cursor-pointer md:flex-nowrap" onClick={() => setFolderOwner(link)}>
        <h2 className={h2ClassName} style={{ color: fontColor }}>
          {link.label}
        </h2>
      </div>
    );
  return (
    <Link href={link.url} rel="noopener noreferrer" target="_blank">
      <h2 className={h2ClassName} style={{ color: fontColor }}>
        {link.label}
      </h2>
    </Link>
  );
};

const BioLink = ({ page, link, setFolderOwner }: BioLinkProps) => {
  const primaryColor = page?.primaryColor || defaultPage.primaryColor;
  const fontColor = page?.fontColor || defaultPage.fontColor;
  const cardBlur = page?.cardBlur || defaultPage.cardBlur;
  const cardHueRotate = page?.cardHueRotate || defaultPage.cardHueRotate;

  const cardStyle = {
    backgroundColor: `rgb(${primaryColor.r},${primaryColor.g},${primaryColor.b},${primaryColor.a})`,
  };

  return (
    <>
      <div className={"w-full border-black/50 border-b-[1.5px] arrow-card-start rounded-l-xl max-w-[28%]"}>
        <div
          className={clsx(
            cardBlur,
            cardHueRotate,
            "flex flex-col w-full h-full p-0 py-[0.6rem] justify-center",
            "px-2 shadow-black sm:px-3 arrow-card-start rounded-l-xl"
          )}
          style={cardStyle}
        >
          <BannerComponent link={link} fontColor={fontColor} />
        </div>
      </div>

      <div
        className={
          "w-full border-black/50 border-b-[1.5px] arrow-card-end rounded-r-xl -ml-[1rem] sm:-ml-[1.35rem] md:-ml-[1.6rem]"
        }
      >
        <div
          className={clsx(
            cardBlur,
            cardHueRotate,
            "flex flex-col w-full h-full p-0 py-[0.6rem] justify-center break-all",
            "px-2 shadow-black sm:px-3 arrow-card-end rounded-r-xl"
          )}
          style={cardStyle}
        >
          <LinkComponent page={page} link={link} setFolderOwner={setFolderOwner} />
        </div>
      </div>
    </>
  );
};

export default memo(BioLink);
