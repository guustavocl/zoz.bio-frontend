"use client";
import { memo } from "react";
import Image from "next/image";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { uploadAvatar } from "@/services/PageService";
import { errorToast } from "@/utils/toaster";
import { PageProps } from "@/types/PageProps";
import { defaultPage } from "@/utils/BioVariables";
import { twMerge } from "tailwind-merge";

const EditAvatar = ({ pageName, page }: { pageName: string; page: PageProps }) => {
  const cardBlur = page?.cardBlur || defaultPage.cardBlur;
  const cardHueRotate = page?.cardHueRotate || defaultPage.cardHueRotate;
  const pfpUrl = page?.pfpUrl || defaultPage.pfpUrl;

  const changeAvatar = (file: File) => {
    uploadAvatar(file, pageName)
      .then(() => {
        window.location.reload();
      })
      .catch(error => {
        errorToast(error);
      });
  };

  return (
    <div
      className={twMerge(
        cardBlur,
        cardHueRotate,
        "absolute z-20 top-0 w-2/6 flex flex-col h-full",
        "arrow-card-avatar rounded-l-xl backdrop-saturate-150"
      )}
    >
      <label
        htmlFor="avatar-input"
        className="group flex cursor-pointer flex-col items-center justify-center rounded-full"
      >
        <input
          id="avatar-input"
          className="hidden"
          type="file"
          accept="image/*"
          onChange={e => {
            if (e.target?.files) {
              changeAvatar(e.target.files[0]);
              e.target.value = "";
            }
          }}
        />
        <div className="absolute top-[25%] z-10 flex opacity-70 group-hover:flex md:hidden">
          <ArrowUpTrayIcon className="w-16 md:w-20" />
        </div>
        <Image className="object-cover rounded-l-xl opacity-80" src={pfpUrl} fill quality={90} alt="bio page avatar" />
      </label>
    </div>
  );
};

export default memo(EditAvatar);
