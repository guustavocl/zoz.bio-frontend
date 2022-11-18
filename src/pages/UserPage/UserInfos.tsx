import React from "react";
import { useToasts } from "../../context/ToastProvider/useToasts";
import { IPage } from "../../types/IPage";
import { getAdornmentIcon } from "./IconsList";

type UserInfosProps = {
  page: IPage;
};

export const UserInfos = ({ page }: UserInfosProps) => {
  const { successToast } = useToasts();
  return (
    <React.Fragment>
      <div className="flex flex-col items-center w-full">
        <h2
          className="page-font-color flex flex-row items-center text-center text-2xl font-bold tracking-wide leading-6"
          style={{
            textShadow: "2px 2px #00000090",
          }}
        >
          {page?.uname || "No name~"}
          {page?.adornment ? (
            <img
              className="w-7"
              src={getAdornmentIcon(page.adornment).icon}
              alt={getAdornmentIcon(page.adornment).label}
            />
          ) : null}
        </h2>
        <span
          className="text-sm font-semibold cursor-pointer -mt-1 hsecondary tracking-wide"
          onClick={() => {
            successToast(`Copyed`);
            if (navigator.clipboard) {
              navigator.clipboard.writeText(
                `https://zoz.gg/${page?.pagename || ""}`
              );
            }
          }}
        >
          {`zoz.gg/${page?.pagename || ""}`}
        </span>
        <div
          className="page-font-color opacity-70 text-center flex flex-col items-center mt-3 text-sm font-semibold tracking-tight break-words"
          style={{
            lineHeight: "0.9rem",
          }}
        >
          {page?.bio}
        </div>
      </div>
    </React.Fragment>
  );
};
