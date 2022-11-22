import { useEffect } from "react";
import { LabelInput } from "../../components/Inputs";
import { useToasts } from "../../context/ToastProvider/useToasts";
import pageService from "../../services/page.service";
import { IPage } from "../../types/IPage";
import { useFormik } from "formik";
import * as yup from "yup";
import Dialog from "../../components/Dialogs/Dialog";

type DialogEditInfosProps = {
  isOpen: boolean;
  page: IPage;
  setIsOpen: (value: boolean) => void;
  setPage: (value: IPage | undefined) => void;
  addNewPage?: (page: IPage) => void;
};

const DialogEditInfos = ({
  isOpen,
  setIsOpen,
  page,
  setPage,
}: DialogEditInfosProps) => {
  const { errorToast, successToast } = useToasts();

  useEffect(() => {}, [isOpen]);

  const formik = useFormik({
    initialValues: {
      uname: page?.uname || "",
      bio: page?.bio || "",
    },
    validationSchema: yup.object({
      uname: yup.string().required("Display Name is required"),
    }),
    onSubmit: (values) => {
      pageService
        .savePageInfos(values.uname, values.bio, page.pagename)
        .then((response) => {
          successToast(response.message);
          formik.setSubmitting(false);
          setPage(response.page);
          setIsOpen(false);
        })
        .catch((error) => {
          errorToast(error.message);
          if (error.errors) formik.setErrors(error.errors);
        });
    },
  });

  return (
    <Dialog
      title="Edit your personal infos"
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="mt-4">
          <LabelInput
            id="uname"
            name="uname"
            type="text"
            label="Display Name"
            minSize={1}
            size={25}
            value={formik.values.uname}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            errors={
              formik.touched.uname && formik.errors.uname
                ? formik.errors.uname
                : undefined
            }
          />
        </div>
        <div className="mt-4">
          <LabelInput
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

        <button
          type="submit"
          disabled={formik.isSubmitting}
          className={
            "mt-4 group relative flex w-full justify-center rounded border border-transparent " +
            "py-2 px-4 text-3x1 font-medium hover:font-semibold" +
            "focus:outline-none focus:ring-0 focus:ring-indigo-500 focus:ring-offset-0 " +
            `${
              formik.isSubmitting
                ? "bg-violet-800 text-gray-400"
                : "bg-violet-700 hover:bg-violet-900 text-white"
            }`
          }
        >
          Save
        </button>
      </form>
    </Dialog>
  );
};

export default DialogEditInfos;
