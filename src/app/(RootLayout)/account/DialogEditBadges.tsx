import { useEffect, useState } from "react";
import { useToasts } from "../../context/ToastProvider/useToasts";
import { PageProps } from "../../types/PageProps";
import { useFormik } from "formik";
import ZozDialog from "../../components/Dialogs";

type DialogEditBadgesProps = {
  isOpen: boolean;
  page: PageProps;
  setIsOpen: (value: boolean) => void;
  setPage: (value: PageProps | undefined) => void;
  addNewPage?: (page: PageProps) => void;
};

const DialogEditBadges = ({ isOpen, page, setIsOpen, setPage }: DialogEditBadgesProps) => {
  const { errorToast, successToast } = useToasts();
  const [badges, setbadges] = useState<string[]>([]);

  useEffect(() => {
    if (isOpen && page && page.badges) {
      setbadges(Object.assign([], page.badges));
    }
  }, [isOpen]);

  const formik = useFormik({
    initialValues: {
      badges: [],
    },
    onSubmit: values => {
      if (values.badges.length < 10) {
        pageService
          .saveBadges(badges, page.pagename)
          .then(response => {
            successToast(response.message);
            setPage(response.page);
            setIsOpen(false);
          })
          .catch(error => {
            errorToast(error.message);
          })
          .finally(() => {
            formik.resetForm();
            formik.setSubmitting(false);
          });
      }
    },
  });

  return (
    <ZozDialog title="Select your badges" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={formik.handleSubmit} className="flex flex-col items-center">
        <div className="mt-8 flex flex-row flex-wrap justify-center gap-2">
          {Array.from(badgeList).map((badge, idx) => (
            <span
              key={idx}
              className={
                "ring-badges cursor-pointer whitespace-nowrap rounded px-1 py-0.5 text-sm font-semibold shadow-md shadow-black ring-1 " +
                `${badges.indexOf(badge[0]) > -1 ? "bg-violet-200 text-violet-800 " : "text-white"}`
              }
              onClick={() => {
                console.log(badges.indexOf(badge[0]));
                if (badges.indexOf(badge[0]) > -1) {
                  const newBadges = badges.filter(value => {
                    return !(badge[0] === value);
                  });
                  setbadges(newBadges);
                } else {
                  setbadges([...badges, badge[0]]);
                }
              }}
            >
              {badge[1].label}
            </span>
          ))}
        </div>
        <button
          type="submit"
          className={
            "group relative mt-10 flex w-full justify-center rounded border border-transparent " +
            "text-3x1 px-4 py-2 font-medium hover:font-semibold " +
            "bg-violet-700 text-white hover:bg-violet-900 "
          }
        >
          Save
        </button>
      </form>
    </ZozDialog>
  );
};

export default DialogEditBadges;
