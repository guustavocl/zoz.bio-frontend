import { IPage } from "../../types/IPage";

type SectionCardProps = {
  children: JSX.Element;
  page: IPage;
  className?: string;
};

export const SectionCard = ({
  children,
  page,
  className,
}: SectionCardProps) => {
  const primaryColor = page?.primaryColor || "#4106a050";
  const cardBlur = page?.cardBlur || "backdrop-blur";
  const cardHueRotate = page?.cardHueRotate || "";
  // const cardSepia = "backdrop-sepia";

  return (
    <div
      className={
        "relative flex flex-col justify-center " +
        "w-full sm:w-5/6 md:w-3/4 lg:w-3/5 lg:max-w-2xl " +
        "px-2 mb-2 rounded-xl sm:px-3 shadow-black shadow-lg " +
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
