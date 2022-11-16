import React from "react";
import { useToasts } from "../../context/ToastProvider/useToasts";
import { IPage } from "../../types/IPage";

type UserInfosProps = {
  page: IPage;
};

export const UserInfos = ({ page }: UserInfosProps) => {
  const { successToast } = useToasts();
  return (
    <React.Fragment>
      <div className="flex flex-col items-center">
        <h2
          className="page-font-color flex flex-row items-center text-center text-2xl font-bold tracking-wide leading-5"
          style={{
            textShadow: "2px 2px #00000090",
          }}
        >
          {page?.uname || "No name~"}
          <img className="w-7" src="./icons/extra/startag.png" alt="" />
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
