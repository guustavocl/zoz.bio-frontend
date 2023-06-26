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
        "sm:absolute z-20 -mb-3 sm:mb-0 sm:top-0 sm:w-2/6 sm:flex flex-col h-40 sm:h-full",
        "arrow-card-avatar rounded-t-xl sm:rounded-tr-none sm:rounded-l-xl backdrop-saturate-150"
      )}
    >
      <label
        htmlFor="avatar-input"
        className="relative group flex cursor-pointer flex-col items-center justify-center rounded-full h-full"
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
        <div className="absolute top-[25%] z-30 flex opacity-70 group-hover:flex md:hidden">
          <ArrowUpTrayIcon className="w-20" />
        </div>
        <Image
          fill
          quality={90}
          priority={true}
          className="z-20 object-cover rounded-t-xl sm:rounded-tr-none sm:rounded-l-xl opacity-50 sm:opacity-80"
          src={pfpUrl}
          alt="bio page avatar"
          placeholder="empty"
          sizes="(max-width: 768px) 250px, (max-width: 1200px) 350px, 400px"
        />
      </label>
    </div>
  );
};

export default memo(EditAvatar);
