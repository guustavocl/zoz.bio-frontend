import { useEffect, useState } from "react";
import { useToasts } from "../../context/ToastProvider/useToasts";
import { IPage } from "../../types/IPage";
import { useFormik } from "formik";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import React from "react";
import { ZozInput } from "../../components/Inputs";
import ZozDialog from "../../components/Dialogs";
import pageService from "../../services/page.service";
import * as yup from "yup";

type DialogEditInfosProps = {
  isOpen: boolean;
  page: IPage;
  setIsOpen: (value: boolean) => void;
  setPage: (value: IPage | undefined) => void;
  addNewPage?: (page: IPage) => void;
};

const DialogEditInfos = ({ isOpen, setIsOpen, page, setPage }: DialogEditInfosProps) => {
  const { errorToast, successToast } = useToasts();
  const [newPagename, setNewPagename] = useState("");
  const [isPagenameAvailable, setPagenameAvailable] = useState(true);

  useEffect(() => {
    if (page?.pagename) setNewPagename(page.pagename);
  }, [isOpen]);

  useEffect(() => {
    let pagenameQuery: any;
    if (page?.pagename && newPagename === page.pagename) {
      setPagenameAvailable(true);
    } else {
      pagenameQuery = setTimeout(() => {
        if (newPagename && newPagename.length > 0)
          pageService
            .checkPagename(newPagename)
            .then(response => {
              setPagenameAvailable(response.isAvailable);
            })
            .catch(error => {
              errorToast(error.message);
            });
      }, 300);
    }
    return () => {
      clearTimeout(pagenameQuery);
    };
  }, [newPagename]);

  const formik = useFormik({
    initialValues: {
      uname: page?.uname || "",
      bio: page?.bio || "",
    },
    validationSchema: yup.object({
      uname: yup.string().required("Display Name is required"),
    }),
    onSubmit: values => {
      pageService
        .savePageInfos(values.uname, values.bio, page.pagename, newPagename?.length > 1 ? newPagename : page.pagename)
        .then(response => {
          successToast(response.message);
          setPage(response.page);
          setIsOpen(false);
        })
        .catch(error => {
          errorToast(error.message);
          if (error.errors) formik.setErrors(error.errors);
        })
        .finally(() => formik.setSubmitting(false));
    },
  });

  return (
    <ZozDialog title="Edit your personal infos" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-4">
          <ZozInput
            id="uname"
            name="uname"
            type="text"
            label="Display Name"
            minSize={1}
            size={25}
            value={formik.values.uname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errors={formik.touched.uname && formik.errors.uname ? formik.errors.uname : undefined}
          />
        </div>
        <div className="mt-4">
          <ZozInput
            id="bio"
            name="bio"
            type="textarea"
            label="Bio"
            size={200}
            value={formik.values.bio}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </div>
        <div className="mt-4">
          <ZozInput
            id="pagename"
            name="pagename"
            type="text"
            label="Page Name"
            placeholder={newPagename}
            minSize={5}
            size={30}
            value={newPagename}
            iconAdornment={
              isPagenameAvailable ? (
                <CheckIcon className="w-6 text-green-600" />
              ) : (
                <XMarkIcon className="w-6 text-red-600" />
              )
            }
            errors={
              isPagenameAvailable
                ? newPagename.length < 5
                  ? "Cant use pagenames with 4 or less characters yet"
                  : undefined
                : "Paganame already taken"
            }
            onChange={e => {
              const pagename = e.target.value.replace(/[^a-z0-9_-]+|\s+/gim, "");
              setNewPagename(pagename);
            }}
          />
        </div>

        <button
          type="submit"
          disabled={
            !(page?.pagename && newPagename === page.pagename) &&
            (newPagename.length < 5 || formik.isSubmitting || !isPagenameAvailable)
          }
          className={
            "mt-6 group relative flex w-full justify-center rounded border border-transparent " +
            "py-2 px-4 text-3x1 font-medium hover:font-semibold " +
            `${
              formik.isSubmitting || newPagename.length < 5 || !isPagenameAvailable
                ? "bg-violet-800 text-gray-400 "
                : "bg-violet-700 hover:bg-violet-900 text-white "
            }`
          }
        >
          Save
        </button>
      </form>
    </ZozDialog>
  );
};

export default React.memo(DialogEditInfos);
