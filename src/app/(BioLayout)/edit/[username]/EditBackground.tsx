"use client";
import { uploadBackground } from "@/services/PageService";
import { PageProps } from "@/types/PageProps";
import { defaultPage } from "@/utils/BioVariables";
import { errorToast } from "@/utils/toaster";
import { ArrowUpTrayIcon, Cog6ToothIcon } from "@heroicons/react/24/outline";
import { memo } from "react";
import EditColors from "./EditColors";
import clsx from "clsx";
import ButtonCard from "./ButtonCard";

const EditBackground = ({ page }: { page: PageProps }) => {
  const cardBlur = page?.cardBlur || defaultPage.cardBlur;
  const cardHueRotate = page?.cardHueRotate || defaultPage.cardHueRotate;
  const primaryColor = page?.primaryColor || defaultPage.primaryColor;

  const changeBackground = (file: File) => {
    uploadBackground(file, page.pagename)
      .then(() => {
        window.location.reload();
      })
      .catch(error => {
        errorToast(error);
      });
  };

  return (
    <div className="mt-16 mb-2 flex flex-col sm:flex-row gap-2">
      <EditColors page={page} />
      <div className="flex flex-row gap-2">
        <label
          htmlFor="background-input"
          className={clsx(
            "group cursor-pointer flex flex-col justify-center items-center",
            "hover:opacity-80 p-1 w-48 rounded-xl sm:px-3 shadow-black shadow-sm",
            cardBlur,
            cardHueRotate
          )}
          style={{
            backgroundColor: `rgb(${primaryColor.r},${primaryColor.g},${primaryColor.b},${primaryColor.a})`,
          }}
        >
          <input
            id="background-input"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={e => {
              if (e.target?.files) {
                changeBackground(e.target.files[0]);
                e.target.value = "";
              }
            }}
          />
          <div className="flex group-hover:hidden opacity-70 z-10">
            <ArrowUpTrayIcon className="w-8" />
          </div>
          <span className="hidden group-hover:flex opacity-70 z-10 h-8 justify-center items-center">
            Upload background
          </span>
        </label>
        <ButtonCard
          label=""
          className="h-full w-16"
          page={page}
          onClick={() => console.log("click")}
          iconAdornment={<Cog6ToothIcon className="w-7" />}
        />
      </div>
    </div>
  );
};
export default memo(EditBackground);
