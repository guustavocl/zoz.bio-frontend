import React from "react";
import { PageProps } from "../../types/PageProps";
import { defaultPage } from "./PageVariables";

type SectionCardProps = {
  children: JSX.Element;
  page?: PageProps;
  className?: string;
  center?: boolean;
};

const SectionCard = ({ children, page, className, center = true }: SectionCardProps) => {
  const primaryColor = page?.primaryColor || defaultPage.primaryColor;
  const cardBlur = page?.cardBlur || defaultPage.cardBlur;
  const cardHueRotate = page?.cardHueRotate || defaultPage.cardHueRotate;

  return (
    <div
      className={
        "relative flex flex-col " +
        "w-full sm:w-5/6 md:w-3/4 lg:w-3/5 lg:max-w-2xl " +
        "px-2 mb-2 rounded-xl sm:px-3 shadow-black shadow-sm " +
        `${center ? "justify-center" : "justify-start"} ` +
        `${cardBlur} ${cardHueRotate} ` +
        `${className}`
      }
      style={{
        backgroundColor: `rgb(${primaryColor.r},${primaryColor.g},${primaryColor.b},${primaryColor.a})`,
      }}
    >
      <div className="flex flex-col md:flex-row p-0 py-3 rounded-md">{children}</div>
    </div>
  );
};

export default React.memo(SectionCard);
