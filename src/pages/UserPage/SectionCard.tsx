import { IPage } from "../../types/IPage";
import { defaultPage } from "./UserVariables";

type SectionCardProps = {
  children: JSX.Element;
  page?: IPage;
  className?: string;
  center?: boolean;
};

export const SectionCard = ({
  children,
  page,
  className,
  center = true,
}: SectionCardProps) => {
  const primaryColor = page?.primaryColor || defaultPage.primaryColor;
  const cardBlur = page?.cardBlur || defaultPage.cardBlur;
  const cardHueRotate = page?.cardHueRotate || defaultPage.cardHueRotate;

  return (
    <div
      className={
        "relative flex flex-col " +
        "w-full sm:w-5/6 md:w-3/4 lg:w-3/5 lg:max-w-2xl " +
        "px-2 mb-2 rounded-xl sm:px-3 shadow-black shadow-lg " +
        `${center ? "justify-center" : "justify-start"} ` +
        `${cardBlur} ${cardHueRotate} ` +
        `${className}`
      }
      style={{
        backgroundColor: `${primaryColor}`,
      }}
    >
      <div className="flex flex-col md:flex-row p-0 py-3 rounded-md">
        {children}
      </div>
    </div>
  );
};
