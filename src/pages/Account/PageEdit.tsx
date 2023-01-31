import React, { useState } from "react";
import { IPage, IPageSocialMedia, IPageStatus } from "../../types/IPage";
import { useAuth } from "../../context/AuthProvider/useAuth";
import { Cog6ToothIcon, PencilSquareIcon, ArrowUpTrayIcon, PlusIcon } from "@heroicons/react/20/solid";
import { BigHead } from "@bigheads/core";
import { getBadge, getStatusIcon } from "../Page/IconsList";
import { defaultPage, setCssVariables } from "../Page/PageVariables";
import { useToasts } from "../../context/ToastProvider/useToasts";
import DialogEditInfos from "./DialogEditInfos";
import SectionCard from "../Page/SectionCard";
import PageIcon from "../Page/PageIcon";
import PageInfos from "../Page/PageInfos";
import pageService from "../../services/page.service";
import PageEditColors from "./PageEditColors";
import DialogEditSocials from "./DialogEditSocials";
import DialogEditBadges from "./DialogEditBadges";
import DialogNewLink from "./DialogNewLink";
import PageLinks from "../Page/PageLinks";
import "../Page/Page.css";
import { LazyLoadImage } from "../../components/Loading";

const mapSocials = (pageSocialMedias: IPageSocialMedia[]) => {
  return (
    <div className="flex flex-row flex-wrap gap-1 items-center justify-center mt-3 w-full">
      {pageSocialMedias.map((media, idx) => (
        <PageIcon key={idx} media={media} />
      ))}
    </div>
  );
};

const mapBadges = (pageBadges: string[]) => {
  return (
    <div className="flex flex-row flex-wrap gap-2 mt-3 justify-center w-full">
      {pageBadges.map((badge, idx) =>
        getBadge(badge) ? (
          <span
            key={idx}
            className="ring-badges whitespace-nowrap text-xs font-semibold px-1 py-0.5 rounded ring-1 shadow-black shadow-sm"
          >
            {getBadge(badge)?.label}
          </span>
        ) : null
      )}
    </div>
  );
};

const getPageStatus = (status: IPageStatus) => {
  const statusIcon = getStatusIcon(status.key);
  return statusIcon ? (
    <div className="absolute -ml-1 -mt-1 flex flex-row opacity-50 hover:opacity-100">
      <img className="w-7" src={statusIcon.icon} alt={statusIcon.label} loading="lazy" />
    </div>
  ) : null;
};

const getAvatar = (pfpUrl: string | undefined, uploadAvatar: (value: File) => void) => {
  return (
    <div className="flex flex-col justify-center items-center min-w-fit flex-shrink-0 p-2 select-none">
      <label
        htmlFor="avatar-input"
        className="group cursor-pointer rounded-full flex flex-col justify-center items-center"
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
        <div className="absolute flex md:hidden group-hover:flex opacity-70 z-10">
          <ArrowUpTrayIcon className="w-20" />
        </div>
        {pfpUrl ? (
          <img
            className="ring-avatar opacity-60 md:opacity-100 group-hover:opacity-30 h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 object-cover rounded-full ring-1 border-2"
            src={pfpUrl}
            alt="pfp"
            loading="lazy"
          />
        ) : (
          <div
            className="ring-avatar opacity-60 md:opacity-100 group-hover:opacity-30 h-24 w-24 md:h-28 md:w-28 lg:h-32 lg:w-32 object-cover rounded-full ring-1 border-2"
            style={{ backgroundColor: "#85c5e5" }}
          >
            <BigHead />
          </div>
        )}
      </label>
    </div>
  );
};

const IconOpenDialog = ({ setDialogOpen, label }: { setDialogOpen: (value: boolean) => void; label: string }) => {
  return (
    <div className="relative group hover:text-gray-900 cursor-pointer" onClick={() => setDialogOpen(true)}>
      <span className="hidden md:block absolute translate-x-6 flex overflow-visible whitespace-nowrap font-semibold text-gray-300 animate-pulse group-hover:text-gray-900">
        ← {label}
      </span>
      <PencilSquareIcon className="h-6 text-center" />
    </div>
  );
};

const PageEdit = ({ page, setPage }: { page: IPage; setPage: (value: IPage | undefined) => void }) => {
  const auth = useAuth();
  const { errorToast, successToast } = useToasts();

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
  const [dialogEditSocial, setDialogEditSocial] = useState(false);
  const [dialogEditBadges, setDialogEditBadges] = useState(false);
  const [dialogNewLink, setDialogNewLink] = useState(false);

  const uploadAvatar = (file: File) => {
    pageService
      .uploadAvatar(file, page.pagename)
      .then(response => {
        successToast(response.message);
        setPage(response.page);
      })
      .catch(error => {
        errorToast(error.message);
      });
  };

  const uploadBackground = (file: File) => {
    pageService
      .uploadBackground(file, page.pagename)
      .then(response => {
        successToast(response.message);
        setPage(response.page);
      })
      .catch(error => {
        errorToast(error.message);
      });
  };

  return (
    <React.Fragment>
      {/* Link to Account settings */}
      {auth && auth.email ? (
        <div className="select-none absolute left-0 p-1 px-2 m-2 ">
          <button
            onClick={() => setPage(undefined)}
            className="text-md bg-opacity-5 opacity-50 rounded-lg font-semibold hover:opacity-90 flex flex-row gap-2"
          >
            <Cog6ToothIcon className="h-5 mt-0.5" aria-hidden="true" />
            <span className="animate-pulse">← Click here to go back</span>
          </button>
        </div>
      ) : null}
      {/* Page Background */}
      <LazyLoadImage imageUrl={backgroundUrl} backgroundSize={backgroundSize} backGroundOpacity={backGroundOpacity} />

      <div className="flex flex-col items-center max-w-2x1 px-0 mx-2 sm:px-10 p-2 md:w-full h-screen overflow-y-auto">
        <div className="mt-24 mb-2 flex flex-row gap-2">
          <label
            htmlFor="background-input"
            className={
              "group cursor-pointer flex flex-col justify-center items-center " +
              "hover:opacity-80 p-1 w-48 rounded-xl sm:px-3 shadow-black shadow-sm " +
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
                  uploadBackground(e.target.files[0]);
                  e.target.value = "";
                }
              }}
            />
            <div className="flex group-hover:hidden opacity-70 z-10">
              <ArrowUpTrayIcon className="w-8" />
            </div>
            <span className="flex hidden group-hover:flex opacity-70 z-10 h-8 justify-center items-center">
              Upload background
            </span>
          </label>
          <PageEditColors page={page} setPage={setPage} />
        </div>
        {/* Page Primary Card */}
        <SectionCard className="select-none" page={page}>
          <React.Fragment>
            {getPageStatus(pageStatus)}
            {getAvatar(pfpUrl, uploadAvatar)}
            <div className="flex flex-col w-full">
              <div className="flex flex-row w-full items-start relative">
                <PageInfos page={page} />
                <IconOpenDialog label="Edit Infos" setDialogOpen={setDialogEditPage} />
              </div>
              <div className="flex flex-row w-full items-center">
                {mapBadges(pageBadges)}
                <IconOpenDialog label="Edit Badges" setDialogOpen={setDialogEditBadges} />
              </div>
              <div className="flex flex-row w-full items-end">
                {mapSocials(pageSocialMedias)}
                <IconOpenDialog label="Edit Accounts" setDialogOpen={setDialogEditSocial} />
              </div>
            </div>
          </React.Fragment>
        </SectionCard>

        <button
          className={
            "group cursor-pointer flex flex-row justify-center items-center mb-2 page-font-color " +
            "hover:opacity-80 p-1 w-48 rounded-xl sm:px-3 shadow-black shadow-sm " +
            `${cardBlur} ${cardHueRotate} `
          }
          style={{
            backgroundColor: `rgb(${primaryColor.r},${primaryColor.g},${primaryColor.b},${primaryColor.a})`,
          }}
          onClick={() => setDialogNewLink(true)}
        >
          <PlusIcon className="w-7 mr-2" />
          Add Link
        </button>

        {/* Page Other Cards */}
        <PageLinks page={page} />
      </div>

      {/* Dialogs to edit page */}
      <DialogEditInfos isOpen={dialogEditPage} setIsOpen={setDialogEditPage} page={page} setPage={setPage} />
      {/* Dialogs to edit badges */}
      <DialogEditBadges isOpen={dialogEditBadges} setIsOpen={setDialogEditBadges} page={page} setPage={setPage} />
      {/* Dialogs to edit social media */}
      <DialogEditSocials isOpen={dialogEditSocial} setIsOpen={setDialogEditSocial} page={page} setPage={setPage} />
      {/* Dialogs to insert a new Link */}
      <DialogNewLink isOpen={dialogNewLink} setIsOpen={setDialogNewLink} page={page} setPage={setPage} />
    </React.Fragment>
  );
};

export default React.memo(PageEdit);
