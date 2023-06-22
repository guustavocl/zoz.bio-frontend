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
        "relative flex flex-col w-full p-0 py-[0.6rem]",
        "mb-2 px-2 rounded-xl shadow-sm shadow-black sm:px-3",
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
