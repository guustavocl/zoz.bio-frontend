import { LinkProps } from "@/types/LinkProps";
import { PageProps } from "@/types/PageProps";
import { defaultPage } from "@/utils/BioVariables";
import { getIcon } from "@/utils/IconsList";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { memo } from "react";

type EditLinkProps = {
  page: PageProps;
  link: LinkProps;
  setFolderOwner: (link: LinkProps) => void;
  editLink?: (link: LinkProps) => void;
};

const BannerComponent = ({ link, fontColor }: { link: LinkProps; fontColor: string }) => {
  const typeCover = link.bannerUrl || "";

  return (
    <>
      {typeCover && (
        <Image
          fill
          quality={30}
          priority={false}
          placeholder="empty"
          src={typeCover}
          className="object-cover hover:animate-pulse rounded-l-xl opacity-60"
          alt="link banner"
          sizes="(max-width: 768px) 100px, (max-width: 1200px) 150px, 200px"
        />
      )}
      <div
        className="z-10 flex flex-row items-center gap-2 ml-[10%] md:ml-[18%] text-xl font-bold leading-6 tracking-wide icon-shadow"
        style={{ color: fontColor }}
      >
        <img
          className="icon-shadow h-7 flex-shrink-0"
          src={getIcon(link.isFolder ? "folder" : "link")?.icon}
          alt={`folder icon`}
          loading="lazy"
        />
        <span className="hidden sm:flex">Edit</span>
      </div>
    </>
  );
};

const LinkComponent = ({ page, link, setFolderOwner }: EditLinkProps) => {
  const fontColor = page?.fontColor || defaultPage.fontColor;
  const h2ClassName =
    "sm:ml-7 flex-1 flex-shrink-0 truncate whitespace-pre-wrap text-center font-bold tracking-wide overflow-visible whitespace-nowrap text-lg sm:text-xl";
  if (link.isFolder)
    return (
      <div
        className="cursor-pointer md:flex-nowrap"
        onClick={() => {
          link.isSelected = true;
          setFolderOwner(link);
        }}
      >
        <h2 className={h2ClassName} style={{ color: fontColor }}>
          {/* TODO - UX upgrade */}
          {link.isSelected ? "Click to go back" : link.label}
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

const EditLink = ({ page, link, setFolderOwner, editLink }: EditLinkProps) => {
  const primaryColor = page?.primaryColor || defaultPage.primaryColor;
  const fontColor = page?.fontColor || defaultPage.fontColor;
  const cardBlur = page?.cardBlur || defaultPage.cardBlur;
  const cardHueRotate = page?.cardHueRotate || defaultPage.cardHueRotate;

  const cardStyle = {
    backgroundColor: `rgb(${primaryColor.r},${primaryColor.g},${primaryColor.b},${primaryColor.a})`,
  };

  return (
    <>
      <div
        className={"w-full border-black/50 border-b-[1.5px] arrow-card-start rounded-l-xl max-w-[19%] sm:max-w-[28%]"}
      >
        <div
          className={clsx(
            cardBlur,
            cardHueRotate,
            "relative group flex flex-col w-full h-full p-0 py-[0.6rem] justify-center",
            "px-2 shadow-black sm:px-3 arrow-card-start rounded-l-xl cursor-pointer hover:opacity-70"
          )}
          style={cardStyle}
          onClick={() => editLink && editLink(link)}
        >
          <BannerComponent link={link} fontColor={fontColor} />
        </div>
      </div>

      <div className={"w-full border-black/50 border-b-[1.5px] arrow-card-end rounded-r-xl -ml-[0.4rem] sm:-ml-[1rem]"}>
        <div
          className={clsx(
            cardBlur,
            cardHueRotate,
            "flex flex-col w-full h-full p-0 py-[0.6rem] justify-center break-all",
            "px-2 shadow-black sm:px-3 arrow-card-end rounded-r-xl hover:backdrop-saturate-200"
          )}
          style={cardStyle}
        >
          <LinkComponent page={page} link={link} setFolderOwner={setFolderOwner} />
        </div>
      </div>
    </>
  );
};

export default memo(EditLink);
