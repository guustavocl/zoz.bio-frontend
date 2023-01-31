import { useEffect, useState } from "react";
import { useToasts } from "../../context/ToastProvider/useToasts";
import { IPage } from "../../types/IPage";
import { useFormik } from "formik";
import ZozDialog from "../../components/Dialogs";
import pageService from "../../services/page.service";
import { badgeList } from "../Page/IconsList";

type DialogEditBadgesProps = {
  isOpen: boolean;
  page: IPage;
  setIsOpen: (value: boolean) => void;
  setPage: (value: IPage | undefined) => void;
  addNewPage?: (page: IPage) => void;
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
        <div className="flex flex-row flex-wrap gap-2 mt-8 justify-center">
          {Array.from(badgeList).map((badge, idx) => (
            <span
              key={idx}
              className={
                "ring-badges whitespace-nowrap text-sm font-semibold px-1 py-0.5 rounded ring-1 shadow-black shadow-md cursor-pointer " +
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
            "mt-10 group relative flex w-full justify-center rounded border border-transparent " +
            "py-2 px-4 text-3x1 font-medium hover:font-semibold " +
            "bg-violet-700 hover:bg-violet-900 text-white "
          }
        >
          Save
        </button>
      </form>
    </ZozDialog>
  );
};

export default DialogEditBadges;
