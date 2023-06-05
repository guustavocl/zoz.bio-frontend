import { PageProps } from "@/types/PageProps";
import { defaultPage } from "@/utils/BioVariables";
import clsx from "clsx";
import { memo } from "react";

type SectionCardProps = {
  children: JSX.Element;
  page?: PageProps;
  className?: string;
  center?: boolean;
  bioPage?: boolean;
};

const BioCard = ({ children, page, className, center = true, bioPage = true }: SectionCardProps) => {
  const primaryColor = page?.primaryColor || defaultPage.primaryColor;
  const cardBlur = page?.cardBlur || defaultPage.cardBlur;
  const cardHueRotate = page?.cardHueRotate || defaultPage.cardHueRotate;

  return (
    <div
      className={clsx(
        "relative flex flex-col",
        "mb-2 rounded-xl px-2 shadow-sm shadow-black sm:px-3",
        center ? "justify-center" : "justify-start",
        bioPage ? "w-full sm:w-5/6 md:w-3/4 lg:w-3/5 lg:max-w-2xl" : "",
        cardBlur,
        cardHueRotate,
        className
      )}
      style={{
        backgroundColor: `rgb(${primaryColor.r},${primaryColor.g},${primaryColor.b},${primaryColor.a})`,
      }}
    >
      <div className="flex flex-col rounded-md p-0 py-3 md:flex-row">{children}</div>
    </div>
  );
};

export default memo(BioCard);
