import { PageProps } from "@/types/PageProps";
import { defaultPage } from "@/utils/BioVariables";
import { ReactNode, memo } from "react";
import { twMerge } from "tailwind-merge";

type ButtonCardProps = {
  label: string;
  page: PageProps;
  onClick: () => void;
  className?: string;
  iconAdornment?: ReactNode;
};

const ButtonCard = ({ label, className, page, onClick, iconAdornment }: ButtonCardProps) => {
  const cardBlur = page?.cardBlur || defaultPage.cardBlur;
  const cardHueRotate = page?.cardHueRotate || defaultPage.cardHueRotate;
  const primaryColor = page?.primaryColor || defaultPage.primaryColor;
  const fontColor = page?.fontColor || defaultPage.fontColor;

  return (
    <button
      className={twMerge(
        "group cursor-pointer flex flex-row justify-center items-center mb-2 h-full",
        "hover:opacity-80 p-1 w-full sm:w-48 rounded-xl sm:px-3 shadow-black shadow-sm",
        cardBlur,
        cardHueRotate,
        className
      )}
      style={{
        backgroundColor: `rgb(${primaryColor.r},${primaryColor.g},${primaryColor.b},${primaryColor.a})`,
        color: fontColor,
      }}
      onClick={onClick}
    >
      {iconAdornment}
      {label}
    </button>
  );
};
export default memo(ButtonCard);
