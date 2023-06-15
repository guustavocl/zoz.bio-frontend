// import "../Page/Page.css";

import BioCard from "@/app/(BioLayout)/[username]/BioCard";
import BioIcon from "@/app/(BioLayout)/[username]/BioIcon";
import BioInfos from "@/app/(BioLayout)/[username]/BioInfos";
import BioLinks from "@/app/(BioLayout)/[username]/BioLinks";
import { LazyLoadImage } from "@/components/Loadings";
import { uploadAvatar, uploadBackground } from "@/services/PageService";
import { PageProps, PagePropsSocialMedia, PagePropsStatus } from "@/types/PageProps";
import { defaultPage, setCssVariables } from "@/utils/BioVariables";
import { getBadge, getStatusIcon } from "@/utils/IconsList";
import { errorToast, successToast } from "@/utils/toaster";
import { ArrowUpTrayIcon, PencilSquareIcon, PlusIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";
import DialogEditBadges from "../../(BioLayout)/edit/[username]/Dialogs/DialogEditBadges";
import DialogEditInfos from "../../(BioLayout)/edit/[username]/Dialogs/DialogEditInfos";
// import DialogEditSocials from "./Dialogs/DialogEditSocials";
// import DialogNewLink from "./Dialogs/DialogNewLink";
// import PageEditColors from "./PageEditColors";

const mapSocials = (pageSocialMedias: PagePropsSocialMedia[]) => {
  return (
    <div className="mt-3 flex w-full flex-row flex-wrap items-center justify-center gap-1">
      {pageSocialMedias.map((media, idx) => (
        <BioIcon key={idx} media={media} />
      ))}
    </div>
  );
};

const mapBadges = (pageBadges: string[]) => {
  return (
    <div className="mt-3 flex w-full flex-row flex-wrap justify-center gap-2">
      {pageBadges.map((badge, idx) =>
        getBadge(badge) ? (
          <span
            key={idx}
            className="ring-badges whitespace-nowrap rounded px-1 py-0.5 text-xs font-semibold shadow-sm shadow-black ring-1"
          >
            {getBadge(badge)?.label}
          </span>
        ) : null
      )}
    </div>
  );
};

const getPageStatus = (status: PagePropsStatus) => {
  const statusIcon = getStatusIcon(status.key);
  return statusIcon ? (
    <div className="absolute -ml-1 -mt-1 flex flex-row opacity-50 hover:opacity-100">
      <img className="w-7" src={statusIcon.icon} alt={statusIcon.label} loading="lazy" />
    </div>
  ) : null;
};

const getAvatar = (pfpUrl: string | undefined, uploadAvatar: (value: File) => void) => {
  return (
    <div className="flex min-w-fit flex-shrink-0 select-none flex-col items-center justify-center p-2">
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
              uploadAvatar(e.target.files[0]);
              e.target.value = "";
            }
          }}
        />
        <div className="absolute z-10 flex opacity-70 group-hover:flex md:hidden">
          <ArrowUpTrayIcon className="w-20" />
        </div>
        {pfpUrl ? (
          <img
            className="ring-avatar h-24 w-24 rounded-full border-2 object-cover opacity-60 ring-1 group-hover:opacity-30 md:h-28 md:w-28 md:opacity-100 lg:h-32 lg:w-32"
            src={pfpUrl}
            alt="pfp"
            loading="lazy"
          />
        ) : (
          <div
            className="ring-avatar h-24 w-24 rounded-full border-2 object-cover opacity-60 ring-1 group-hover:opacity-30 md:h-28 md:w-28 md:opacity-100 lg:h-32 lg:w-32"
            style={{ backgroundColor: "#85c5e5" }}
          >
            {/* TODO - default avatar */}
          </div>
        )}
      </label>
    </div>
  );
};

const IconOpenDialog = ({ setDialogOpen, label }: { setDialogOpen: (value: boolean) => void; label: string }) => {
  return (
    <div className="group relative cursor-pointer hover:text-gray-900" onClick={() => setDialogOpen(true)}>
      <span className="absolute flex translate-x-6 animate-pulse overflow-visible whitespace-nowrap font-semibold text-gray-300 group-hover:text-gray-900 md:block">
        ← {label}
      </span>
      <PencilSquareIcon className="h-6 text-center" />
    </div>
  );
};

const PageEdit = ({ page, savePage }: { page: PageProps; savePage: (value: PageProps | undefined) => void }) => {
  // const auth = null;

  const primaryColor = page?.primaryColor || defaultPage.primaryColor;
  const secondaryColor = page?.secondaryColor || defaultPage.secondaryColor;
  const fontColor = page?.fontColor || defaultPage.fontColor;
  const pfpUrl = page?.pfpUrl || undefined;
  const backgroundUrl = page?.backgroundUrl || defaultPage.bgUrl;
  const backgroundSize = page?.backgroundSize || defaultPage.bgSize;
  const backGroundOpacity = page?.backGroundOpacity || defaultPage.bgOpacity;
  const pageSocialMedias = page?.socialMedias?.length > 0 ? page.socialMedias : defaultPage.pageSocialMedias;

  const pageBadges = page?.badges?.length > 0 ? page.badges : defaultPage.pageBadges;
  const pageStatus = page?.status || defaultPage.pageStatus;

  const cardBlur = page?.cardBlur || defaultPage.cardBlur;
  const cardHueRotate = page?.cardHueRotate || defaultPage.cardHueRotate;

  setCssVariables(primaryColor, secondaryColor, fontColor);

  const [dialogEditPage, setDialogEditPage] = useState(false);
  // const [dialogEditSocial, setDialogEditSocial] = useState(false);
  const [dialogEditBadges, setDialogEditBadges] = useState(false);
  // const [dialogNewLink, setDialogNewLink] = useState(false);

  const editAvatar = (file: File) => {
    uploadAvatar(file, page.pagename)
      .then(response => {
        successToast(response.message);
        savePage(response.page);
      })
      .catch(error => {
        errorToast(error.message);
      });
  };

  const editBackground = (file: File) => {
    uploadBackground(file, page.pagename)
      .then(response => {
        successToast(response.message);
        savePage(response.page);
      })
      .catch(error => {
        errorToast(error.message);
      });
  };

  return (
    <React.Fragment>
      {/* Link to Account settings */}
      {/* {auth && auth.email ? (
        <div className="absolute left-0 m-2 select-none p-1 px-2 ">
          <button
            onClick={() => savePage(undefined)}
            className="text-md flex flex-row gap-2 rounded-lg bg-opacity-5 font-semibold opacity-50 hover:opacity-90"
          >
            <Cog6ToothIcon className="mt-0.5 h-5" aria-hidden="true" />
            <span className="animate-pulse">← Click here to go back</span>
          </button>
        </div>
      ) : null} */}
      {/* Page Background */}
      <LazyLoadImage imageUrl={backgroundUrl} backgroundSize={backgroundSize} backGroundOpacity={backGroundOpacity} />

      <div className="max-w-2x1 mx-2 flex h-screen flex-col items-center overflow-y-auto p-2 px-0 sm:px-10 md:w-full">
        <div className="mb-2 mt-24 flex flex-row gap-2">
          <label
            htmlFor="background-input"
            className={
              "group flex cursor-pointer flex-col items-center justify-center " +
              "w-48 rounded-xl p-1 shadow-sm shadow-black hover:opacity-80 sm:px-3 " +
              `${cardBlur} ${cardHueRotate} `
            }
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
                  editBackground(e.target.files[0]);
                  e.target.value = "";
                }
              }}
            />
            <div className="z-10 flex opacity-70 group-hover:hidden">
              <ArrowUpTrayIcon className="w-8" />
            </div>
            <span className="z-10 flex h-8 items-center justify-center opacity-70 group-hover:flex">
              Upload background
            </span>
          </label>
          {/* <PageEditColors page={page} savePage={savePage} /> */}
        </div>
        {/* Page Primary Card */}
        <BioCard className="select-none" page={page}>
          <React.Fragment>
            {getPageStatus(pageStatus)}
            {getAvatar(pfpUrl, editAvatar)}
            <div className="flex w-full flex-col">
              <div className="relative flex w-full flex-row items-start">
                <BioInfos page={page} />
                <IconOpenDialog label="Edit Infos" setDialogOpen={setDialogEditPage} />
              </div>
              <div className="flex w-full flex-row items-center">
                {mapBadges(pageBadges)}
                <IconOpenDialog label="Edit Badges" setDialogOpen={setDialogEditBadges} />
              </div>
              <div className="flex w-full flex-row items-end">
                {mapSocials(pageSocialMedias)}
                {/* <IconOpenDialog label="Edit Accounts" setDialogOpen={setDialogEditSocial} /> */}
              </div>
            </div>
          </React.Fragment>
        </BioCard>

        <button
          className={
            "page-font-color group mb-2 flex cursor-pointer flex-row items-center justify-center " +
            "w-48 rounded-xl p-1 shadow-sm shadow-black hover:opacity-80 sm:px-3 " +
            `${cardBlur} ${cardHueRotate} `
          }
          style={{
            backgroundColor: `rgb(${primaryColor.r},${primaryColor.g},${primaryColor.b},${primaryColor.a})`,
          }}
          // onClick={() => setDialogNewLink(true)}
        >
          <PlusIcon className="mr-2 w-7" />
          Add Link
        </button>

        {/* Page Other Cards */}
        <BioLinks page={page} />
      </div>

      {/* Dialogs to edit page */}
      <DialogEditInfos isOpen={dialogEditPage} setIsOpen={setDialogEditPage} page={page} savePage={savePage} />
      {/* Dialogs to edit badges */}
      <DialogEditBadges isOpen={dialogEditBadges} setIsOpen={setDialogEditBadges} page={page} savePage={savePage} />
      {/* Dialogs to edit social media */}
      {/* <DialogEditSocials isOpen={dialogEditSocial} setIsOpen={setDialogEditSocial} page={page} savePage={savePage} /> */}
      {/* Dialogs to insert a new Link */}
      {/* <DialogNewLink isOpen={dialogNewLink} setIsOpen={setDialogNewLink} page={page} savePage={savePage} /> */}
    </React.Fragment>
  );
};

export default React.memo(PageEdit);
