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
  const pfpUrl = page?.pfpUrl || defaultPage.pfpUrl;
  const primaryColor = page?.primaryColor || defaultPage.primaryColor;

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
        "relative sm:absolute sm:left-0 z-20 -mb-3 sm:mb-0 sm:top-0 sm:w-2/6 sm:flex flex-col h-40 sm:h-full",
        "arrow-card-avatar rounded-t-xl sm:rounded-tr-none sm:rounded-l-xl sm:backdrop-saturate-150"
      )}
    >
      <label
        htmlFor="avatar-input"
        className="group relative group flex cursor-pointer flex-col items-center justify-center rounded-full h-full"
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
          src={pfpUrl}
          className="z-20 object-cover rounded-t-xl sm:rounded-tr-none sm:rounded-l-xl opacity-80 hidden sm:flex group-hover:opacity-60"
          alt="bio page avatar"
          placeholder="empty"
          sizes="(max-width: 768px) 250px, (max-width: 1200px) 350px, 400px"
        />
        <Image
          quality={90}
          width={200}
          height={200}
          priority={true}
          src={pfpUrl}
          className="h-[9.5rem] w-[9.5rem] z-20 rounded-full sm:rounded-tr-none sm:rounded-l-xl opacity-60 border-4 flex sm:hidden"
          style={{ borderColor: `rgb(${primaryColor.r},${primaryColor.g},${primaryColor.b},0.8)` }}
          alt="bio page avatar"
          placeholder="empty"
          sizes="(max-width: 768px) 250px, (max-width: 1200px) 350px, 400px"
        />
      </label>
    </div>
  );
};

export default memo(EditAvatar);
