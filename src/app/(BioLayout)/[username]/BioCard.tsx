import { PageProps } from "@/types/PageProps";
import { defaultPage } from "@/utils/BioVariables";
import { twMerge } from "tailwind-merge";
import { ReactNode, memo } from "react";

type SectionCardProps = {
  children: ReactNode;
  page?: PageProps;
  className?: string;
  center?: boolean;
};

const BioCard = ({ children, page, className, center = true }: SectionCardProps) => {
  const primaryColor = page?.primaryColor || defaultPage.primaryColor;
  const cardBlur = page?.cardBlur || defaultPage.cardBlur;
  const cardHueRotate = page?.cardHueRotate || defaultPage.cardHueRotate;
  return (
    <div
      className={twMerge(
        cardBlur,
        cardHueRotate,
        "relative flex flex-row w-full rounded-xl shadow-sm shadow-black",
        center ? "justify-center" : "justify-start",
        className
      )}
      style={{
        backgroundColor: `rgb(${primaryColor.r},${primaryColor.g},${primaryColor.b},${primaryColor.a})`,
      }}
    >
      {children}
    </div>
  );
};

export default memo(BioCard);
