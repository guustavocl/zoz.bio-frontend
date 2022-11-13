import React, { useState } from "react";

type PageProps = {
  pagename: string;
  uname: string;
  status: string;
  bio: string;
  pfpUrl: string;
  bannerUrl: string;
  backgroundUrl: string;
  backgroundOpacity: string;
  primaryColor: string;
  secondaryColor: string;
  subscription: string;
  isUnderConstruction: boolean;
  isPrivate: boolean;
  isBanned: boolean;
  isBlocked: boolean;
  isMod: boolean;
  isAdmin: boolean;
};

type UserPageProps = {
  page: PageProps;
};

const UserPage = ({ page }: UserPageProps) => {
  // TURN THESES VARIABLES IN PAGE SETTINGS MAYBE
  const isDefaultBackground = true;

  return (
    <React.Fragment>
      {/* Background image for entire page with opacity controlled by page settings */}
      <div
        className="absolute w-full h-screen bg-gradient-to-br -z-50"
        style={{
          backgroundSize: isDefaultBackground ? "auto" : "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${
            page?.backgroundUrl
              ? page.backgroundUrl
              : "https://gzap.gtech.site/static/media/background-chat.16885b3e.png"
          })`,
          opacity: page?.backgroundOpacity ? page.backgroundOpacity : 0.5,
          // backgroundImage: `url("https://wallpaperset.com/w/full/8/a/f/438687.jpg")`,
        }}
      ></div>
      {/* Banne image for top of the page controlled by page settings */}
      <div
        className="w-full h-80 bg-gradient-to-br from-violet-500 to-fuchsia-500"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${
            page?.bannerUrl
              ? page.bannerUrl
              : "https://cdn.ayo.so/80d8bd2858fdfac546910d8b269d8d4dd0bd850b41e15cf9.webp"
          })`,
          // backgroundImage: "https://cdn.ayo.so/80d8bd2858fdfac546910d8b269d8d4dd0bd850b41e15cf9.webp",
        }}
      ></div>

      <div className="flex flex-col items-center flex-1 w-full max-w-2x1 px-0 mx-auto sm:px-10">
        <div
          className="-mt-28 relative flex flex-col justify-center w-full md:w-2/4 lg:w-2/5 px-2 mb-6 sm:min-h-full sm:rounded-lg sm:px-6 bg-opacity-90"
          style={{
            backgroundColor: "#00000099",
          }}
        >
          <div className="flex flex-col items-center justify-center p-2 py-4 rounded-md">
            <div className="relative">
              <img
                className="object-cover w-32 h-32 rounded-full border-4 bg-black border-black"
                src="https://cdn.ayo.so/b8e5c2fa49635c2a491966c74799259def4ee4a24f417615.webp"
                alt=""
              />
            </div>
            <div className="flex flex-col items-center leading-3 mt-2">
              <h2 className="text-center text-2xl font-bold tracking-wide text-neutral-300 leading-5">
                {page?.uname || "No name~"}
              </h2>
              <span className="text-neutral-600 text-sm font-sans">
                {`zoz.gg/${page?.pagename || ""}`}
              </span>
            </div>
            <div className="flex flex-col items-center leading-3 mt-3 text-neutral-400 text-sm font-sans">
              {page?.bio}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserPage;
