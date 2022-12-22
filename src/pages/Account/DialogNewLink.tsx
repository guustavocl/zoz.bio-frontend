import React, { useEffect, useState } from "react";
import { useToasts } from "../../context/ToastProvider/useToasts";
import { IPage, IPageSocialMedia } from "../../types/IPage";
import { useFormik } from "formik";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { ZozInput, ZozRadioGroup } from "../../components/Inputs";
import ZozDialog from "../../components/Dialogs";
import PageIcon from "../Page/PageIcon";
import AutoCompleteSocials from "./AutoCompleteSocials";
import linkService from "../../services/link.service";
import * as yup from "yup";
import { getIcon } from "../Page/IconsList";
import { ILink } from "../../types/ILink";

type DialogNewLinkProps = {
  isOpen: boolean;
  page: IPage;
  setIsOpen: (value: boolean) => void;
  setPage: (value: IPage | undefined) => void;
  addNewPage?: (page: IPage) => void;
};

const DialogNewLink = ({
  isOpen,
  page,
  setIsOpen,
  setPage,
}: DialogNewLinkProps) => {
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
      url: "",
      label: "",
      icon: "",
      embedded: "none",
      isFolder: false,
    } as ILink,
    validationSchema: yup.object({
      label: yup.string().required("Label is a required field"),
    }),
    onSubmit: (values) => {
      console.log(values);
      linkService
        .createLink(values, page.pagename)
        .then((response) => {
          successToast(response.message);
          setPage(response.page);
          setIsOpen(false);
        })
        .catch((error) => {
          errorToast(error.message);
          if (error.errors) formik.setErrors(error.errors);
        })
        .finally(() => formik.setSubmitting(false));
    },
  });

  return (
    <ZozDialog
      title="Inform your Link infos"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col items-center w-full"
      >
        <div className="w-full mt-4">
          <ZozRadioGroup
            id="folder"
            label="Type"
            value={formik.values.isFolder ? "folder" : "link"}
            options={[
              {
                value: "link",
                component: <span>Link</span>,
              },
              {
                value: "folder",
                component: <span>Folder</span>,
              },
            ]}
            onChange={(value: string) => {
              formik.setFieldValue("isFolder", value === "folder");
              formik.setFieldValue("embedded", "none");
              formik.setFieldValue("url", "");
            }}
          />
        </div>
        <div className="w-full mt-4">
          <ZozRadioGroup
            id="embedded"
            label="Embedded"
            value={formik.values.embedded}
            disabled={formik.values.isFolder}
            options={[
              {
                value: "none",
                component: <span>None</span>,
              },
              {
                value: "spotify",
                component: <span>Spotify</span>,
                color: "#1ed760",
              },
              {
                value: "youtube",
                component: <span>Youtube</span>,
                color: "#fe0000",
              },
              {
                value: "soundcloud",
                component: <span>Soundcloud</span>,
                color: "#ff5500",
              },
            ]}
            onChange={(value: string) => {
              console.log("radio change: ", value);
              formik.setFieldValue("embedded", value);
            }}
          />
        </div>
        <div className="w-full mt-4">
          <ZozInput
            id="label"
            name="label"
            type="text"
            label="Label"
            minSize={1}
            size={30}
            value={formik.values.label}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errors={
              formik.touched.label && formik.errors.label
                ? formik.errors.label
                : undefined
            }
          />
        </div>
        <div className="w-full mt-4">
          <ZozInput
            id="url"
            name="url"
            type="text"
            label="Url"
            minSize={1}
            size={150}
            value={formik.values.url}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            disabled={formik.values.isFolder}
            // errors={
            //   formik.touched.uname && formik.errors.uname
            //     ? formik.errors.uname
            //     : undefined
            // }
          />
        </div>

        <button
          type="submit"
          className={
            "mt-20 group relative flex w-full justify-center rounded border border-transparent " +
            "py-2 px-4 text-3x1 font-medium hover:font-semibold " +
            "bg-violet-700 hover:bg-violet-900 text-white "
          }
        >
          Add Link
        </button>
      </form>
    </ZozDialog>
  );
};

export default DialogNewLink;
