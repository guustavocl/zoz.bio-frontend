"use client";
import { memo } from "react";
import { RgbaColor } from "react-colorful";
import Image from "next/image";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { uploadAvatar } from "@/services/PageService";
import { errorToast } from "@/utils/toaster";

//TODO - verify avatar ring, default avatar
const EditAvatar = ({ pageName, pfpUrl = "", color }: { pageName: string; pfpUrl?: string; color: RgbaColor }) => {
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
    <div className="flex min-w-fit flex-shrink-0 flex-col items-center justify-center p-2">
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
        <div className="absolute z-10 flex opacity-70 group-hover:flex md:hidden">
          <ArrowUpTrayIcon className="w-16 md:w-20" />
        </div>
        <Image
          className="h-24 w-24 opacity-30 md:opacity-100 rounded-full border-[3px] object-cover hover:animate-pulse md:h-28 md:w-28 lg:h-32 lg:w-32 group-hover:opacity-30"
          src={pfpUrl}
          width={500}
          height={500}
          quality={90}
          alt="bio page avatar"
          style={{
            borderColor: `rgb(${color.r},${color.g},${color.b},${color.a})`,
          }}
        />
      </label>
    </div>
  );
};

export default memo(EditAvatar);
