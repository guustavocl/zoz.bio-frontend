/* eslint-disable @typescript-eslint/no-explicit-any */
import { HexColorPicker, RgbaColor, RgbaColorPicker } from "react-colorful";
import { memo, useEffect, useRef, useState } from "react";
import { CheckIcon } from "@heroicons/react/20/solid";
import { PageProps } from "@/types/PageProps";
import { defaultPage } from "@/utils/BioVariables";
import { DefaultTooltip } from "@/components/Tooltip";
import { updateColors } from "@/services/PageService";
import { errorToast } from "@/utils/toaster";

type ColorCircleProps = {
  originalColor: RgbaColor | string;
  rgbaColor?: RgbaColor;
  hexColor?: string;
  isSubmitting: boolean;
  showPickers: boolean;
  tooltip: string;
  onClick: () => void;
  setColor: (value: any) => void;
  setShowPickers: (value: any) => void;
};

type SubmitProps = {
  primary?: boolean;
  secondary?: boolean;
  font?: boolean;
};

const LoadingSvg = ({ isSubmitting = false }: { isSubmitting: boolean }) => {
  return isSubmitting ? (
    <svg
      aria-hidden="true"
      className="animate-spin fill-blue-200 text-gray-200 dark:text-gray-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
  ) : (
    <span className="select-none"> </span>
  );
};

// TODO - refactor
const ColorCircle = ({
  originalColor,
  rgbaColor,
  hexColor,
  isSubmitting,
  showPickers,
  tooltip,
  onClick,
  setColor,
  setShowPickers,
}: ColorCircleProps) => {
  const pickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let handleClickOutside: any;
    if (showPickers) {
      handleClickOutside = (event: any) => {
        if (pickerRef && pickerRef.current && !pickerRef.current.contains(event.target)) {
          setColor(originalColor);
          setShowPickers({ primary: false, secondary: false, font: false });
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPickers]);

  return (
    <div ref={pickerRef} className="group relative flex items-center">
      <DefaultTooltip content={tooltip}>
        <div
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-4 border-gray-900/[0.8]"
          style={{
            backgroundColor: rgbaColor ? `rgb(${rgbaColor.r},${rgbaColor.g},${rgbaColor.b}, 0.8)` : hexColor,
          }}
          onClick={onClick}
        >
          {showPickers ? <CheckIcon className="w-7 font-bold" /> : <LoadingSvg isSubmitting={isSubmitting} />}
        </div>
        <div className={`absolute ${showPickers ? "flex flex-col" : "hidden"} z-50`}>
          {rgbaColor ? (
            <RgbaColorPicker color={rgbaColor} onChange={setColor} />
          ) : (
            <HexColorPicker color={hexColor} onChange={setColor} />
          )}
          {/* TODO - refactor this button */}
          <button
            className="mt-2 flex w-full justify-center rounded-md border border-transparent bg-gray-900 hover:bg-gray-800 py-1 text-violet-200"
            onClick={onClick}
          >
            Apply color
          </button>
        </div>
      </DefaultTooltip>
    </div>
  );
};

const EditColors = ({ page }: { page: PageProps }) => {
  const primaryColor = page?.primaryColor || defaultPage.primaryColor;
  const secondaryColor = page?.secondaryColor || defaultPage.secondaryColor;
  const fontColor = page?.fontColor || defaultPage.fontColor;
  const [rgbaPrimaryColor, setRgbaPrimaryColor] = useState(primaryColor);
  const [rgbaSecondaryColor, setRgbaSecondaryColor] = useState(secondaryColor);
  const [hexFontColor, setHexFontColor] = useState(fontColor);

  const [showPickers, setShowPickers] = useState({
    primary: false,
    secondary: false,
    font: false,
  });

  const [isSubmitting, setIsSubmitting] = useState({
    primary: false,
    secondary: false,
    font: false,
  });

  const changeColors = (value: SubmitProps) => {
    setIsSubmitting({ ...isSubmitting, ...value });
    updateColors(rgbaPrimaryColor, rgbaSecondaryColor, hexFontColor, page.pagename)
      .then(() => {
        window.location.reload();
      })
      .catch(error => {
        errorToast(error.message);
      });
  };

  return (
    <div className="relative flex select-none flex-row gap-1 w-full justify-center text-lg">
      <div className="absolute flex -translate-y-7 translate-x-0 animate-pulse overflow-visible whitespace-nowrap font-semibold text-gray-300">
        <span>Edit colors</span>
        <span className="pl-1 pt-1 font-bold">⤵</span>
      </div>
      {/* PRIMARY COLOR */}
      <ColorCircle
        tooltip="Primary color"
        originalColor={primaryColor}
        rgbaColor={rgbaPrimaryColor}
        showPickers={showPickers.primary}
        isSubmitting={isSubmitting.primary}
        onClick={() => {
          if (showPickers.primary) {
            changeColors({ primary: true });
          }
          setShowPickers({
            primary: !showPickers.primary,
            secondary: false,
            font: false,
          });
        }}
        setColor={setRgbaPrimaryColor}
        setShowPickers={setShowPickers}
      />

      {/* SECONDARY COLOR */}
      <ColorCircle
        tooltip="Secondary color"
        originalColor={secondaryColor}
        rgbaColor={rgbaSecondaryColor}
        showPickers={showPickers.secondary}
        isSubmitting={isSubmitting.secondary}
        onClick={() => {
          if (showPickers.secondary) {
            changeColors({ secondary: true });
          }
          setShowPickers({
            primary: false,
            secondary: !showPickers.secondary,
            font: false,
          });
        }}
        setColor={setRgbaSecondaryColor}
        setShowPickers={setShowPickers}
      />

      {/* FONT COLOR */}
      <ColorCircle
        tooltip="Font color"
        originalColor={fontColor}
        hexColor={hexFontColor}
        showPickers={showPickers.font}
        isSubmitting={isSubmitting.font}
        onClick={() => {
          if (showPickers.font) {
            changeColors({ font: true });
          }
          setShowPickers({
            primary: false,
            secondary: false,
            font: !showPickers.font,
          });
        }}
        setColor={setHexFontColor}
        setShowPickers={setShowPickers}
      />
    </div>
  );
};

export default memo(EditColors);
