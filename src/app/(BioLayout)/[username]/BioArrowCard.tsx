import { PageProps } from "@/types/PageProps";
import { defaultPage } from "@/utils/BioVariables";
import { twMerge } from "tailwind-merge";
import { ReactNode, memo } from "react";

type SectionCardProps = {
  children: ReactNode;
  page?: PageProps;
  className?: string;
  center?: boolean;
  arrowStart?: boolean;
  arrowEnd?: boolean;
};

const BioArrowCard = ({ children, page, className, center = true, arrowStart, arrowEnd }: SectionCardProps) => {
  const primaryColor = page?.primaryColor || defaultPage.primaryColor;
  const cardBlur = page?.cardBlur || defaultPage.cardBlur;
  const cardHueRotate = page?.cardHueRotate || defaultPage.cardHueRotate;
  return (
    <div
      className={twMerge(
        "arrow-wrap relative w-full mb-2 border-black/90 border-b-[1.8px] border-l-[0.9px] border-r-[0.9px]",
        cardHueRotate,
        arrowStart ? "arrow-card-start rounded-l-xl" : arrowEnd ? "arrow-card-end rounded-r-xl" : "rounded-xl",
        className
      )}
    >
      <div
        className={twMerge(
          cardBlur,
          cardHueRotate,
          "flex flex-col w-full p-0 py-3",
          "px-2 shadow-black sm:px-3",
          center ? "justify-center" : "justify-start",
          arrowStart ? "arrow-card-start rounded-l-xl" : arrowEnd ? "arrow-card-end rounded-r-xl" : "rounded-xl"
        )}
        style={{
          backgroundColor: `rgb(${primaryColor.r},${primaryColor.g},${primaryColor.b},${primaryColor.a})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default memo(BioArrowCard);
