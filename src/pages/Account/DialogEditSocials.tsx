import React, { useEffect, useState } from "react";
import { useToasts } from "../../context/ToastProvider/useToasts";
import { IPage, IPageSocialMedia } from "../../types/IPage";
import { useFormik } from "formik";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { ZozInput } from "../../components/Inputs";
import ZozDialog from "../../components/Dialogs";
import PageIcon from "../Page/PageIcon";
import AutoCompleteSocials from "./AutoCompleteSocials";
import pageService from "../../services/page.service";
import * as yup from "yup";
import { getSocialIcon } from "../Page/IconsList";

type DialogEditSocialsProps = {
  isOpen: boolean;
  page: IPage;
  setIsOpen: (value: boolean) => void;
  setPage: (value: IPage | undefined) => void;
  addNewPage?: (page: IPage) => void;
};

const DialogEditSocials = ({
  isOpen,
  page,
  setIsOpen,
  setPage,
}: DialogEditSocialsProps) => {
  const { errorToast, successToast } = useToasts();
  const [items, setItems] = useState<IPageSocialMedia[]>();
  const [mediaSelected, setMediaSelected] = useState<string>("discord");

  useEffect(() => {
    if (isOpen && page && page.socialMedias) {
      setItems(Object.assign([], page.socialMedias));
    }
  }, [isOpen]);

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("Username is a required field"),
    }),
    onSubmit: (values) => {
      if (values.username && items && items.length < 30) {
        if (items?.some((item) => item.key === mediaSelected)) {
          errorToast("This account has already been added!");
        } else {
          let newItems = Object.assign([], items);
          newItems?.push({
            key: mediaSelected,
            username: values.username,
          });
          setItems(newItems);
        }
        formik.resetForm();
        formik.setSubmitting(false);
      }
    },
  });

  return (
    <ZozDialog title="Link your accounts" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center"
      >
        {/* SOCIALS ADDED */}
        <div className="w-full relative mt-2 bg-secondary/[0.2] rounded-md flex flex-row flex-wrap gap-1 p-4">
          <div className="absolute bottom-0 right-1 text-sm">
            {items?.length || "0"}/30
          </div>
          {items && items.length > 0
            ? items.map((item, idx) => (
                <div key={idx} className="flex flex-col outline-0">
                  <PageIcon key={idx} media={item} />
                  <div className="flex flex-col items-center">
                    <XMarkIcon
                      className="w-7 font-bold text-red-700 cursor-pointer hover:text-red-600"
                      onClick={() => {
                        let newItems = items.filter((value) => {
                          return !(
                            item.key === value.key &&
                            item.username === value.username
                          );
                        });
                        setItems(newItems);
                      }}
                    />
                  </div>
                </div>
              ))
            : null}
        </div>
        {/* SOCIALS INPUTS */}
        <div className="w-full mt-4">
          <AutoCompleteSocials
            id="social"
            name="social"
            type="text"
            label="Account"
            selected={mediaSelected}
            setSelected={setMediaSelected}
          />
        </div>
        <div className="w-full mt-4">
          <ZozInput
            id="username"
            name="username"
            type="text"
            label="Username / Link "
            minSize={1}
            size={60}
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errors={
              formik.touched.username && formik.errors.username
                ? formik.errors.username
                : undefined
            }
          />
        </div>
        {mediaSelected ? (
          <div className="w-full mt-4 text-gray-400 break-words">
            {getSocialIcon(mediaSelected)?.url?.("") ? (
              <React.Fragment>
                ↪ will open this url
                <br />
                <a
                  className="group hover:text-gray-200 flex flex-row"
                  href={getSocialIcon(mediaSelected)?.url?.(
                    formik.values.username
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getSocialIcon(mediaSelected)?.url?.("")}
                  <span className="group text-indigo-500 group-hover:text-indigo-400">
                    <span className="flex group-hover:hidden">
                      {formik.values.username || "😠 fill the required input"}
                    </span>
                    <span className="hidden group-hover:flex">
                      {formik.values.username || "😡 fill the required input"}
                    </span>
                  </span>
                </a>
              </React.Fragment>
            ) : (
              <React.Fragment>
                ↪ will be copied to clipboard:
                <br />
                <span
                  className="group text-indigo-500 cursor-pointer h-full"
                  onClick={() => {
                    successToast(`Copied: ${formik.values.username}`);
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(formik.values.username);
                    }
                  }}
                >
                  <span className="flex group-hover:hidden">
                    {formik.values.username || "😠 fill the required input"}
                  </span>
                  <span className="hidden group-hover:flex">
                    {formik.values.username || "😡 fill the required input"}
                  </span>
                </span>
              </React.Fragment>
            )}
          </div>
        ) : null}
        <button
          type="submit"
          className={
            "mt-4 w-18 group relative flex flex-row justify-center items-center rounded " +
            "py-2 px-4 text-3x1 font-medium hover:font-semibold " +
            "bg-violet-700 hover:bg-violet-900 text-white "
          }
        >
          <PlusIcon className="w-6" />
          Add
        </button>

        <button
          type="button"
          className={
            "mt-20 group relative flex w-full justify-center rounded border border-transparent " +
            "py-2 px-4 text-3x1 font-medium hover:font-semibold " +
            "bg-violet-700 hover:bg-violet-900 text-white "
          }
          onClick={() => {
            console.log("will send api");
            if (items)
              pageService
                .saveSocialMedia(items, page.pagename)
                .then((response) => {
                  successToast(response.message);
                  setPage(response.page);
                  setIsOpen(false);
                })
                .catch((error) => {
                  errorToast(error.message);
                });
          }}
        >
          Save
        </button>
      </form>
    </ZozDialog>
  );
};

export default DialogEditSocials;
