import { Button } from "@/components/Buttons";
import Dialog from "@/components/Dialogs";
import { saveBadges } from "@/services/PageService";
import { PageProps } from "@/types/PageProps";
import { badgeList } from "@/utils/IconsList";
import { errorToast, successToast } from "@/utils/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createBadgesFormSchema = z.object({
  badges: z.string().array(),
});

type CreateBadgesFormData = z.infer<typeof createBadgesFormSchema>;

type DialogEditBadgesProps = {
  isOpen: boolean;
  page: PageProps;
  setIsOpen: (value: boolean) => void;
  savePage: (value: PageProps | undefined) => void;
  addNewPage?: (page: PageProps) => void;
};

const DialogEditBadges = ({ isOpen, page, setIsOpen, savePage }: DialogEditBadgesProps) => {
  // useEffect(() => {
  //   if (isOpen && page && page.badges) {
  //     setbadges(Object.assign([], page.badges));
  //   }
  // }, [isOpen]);

  const submitPageBadges = (data: CreateBadgesFormData) => {
    if (data.badges.length <= 10) {
      saveBadges(data.badges, page.pagename)
        .then(response => {
          successToast(response.message);
          savePage(response.page);
          setIsOpen(false);
        })
        .catch(error => {
          errorToast(error.message);
        });
      // .finally(() => {
      //   formik.resetForm();
      //   formik.setSubmitting(false);
      // });
    } else {
      errorToast("You can only show a maximum of 10 badges");
    }
  };

  const {
    watch,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<CreateBadgesFormData>({
    resolver: zodResolver(createBadgesFormSchema),
    defaultValues: { badges: page.badges || [] },
  });

  const pageBadges = watch("badges");
  return (
    <Dialog title="Select your badges" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(submitPageBadges)} className="flex flex-col items-center">
        <div className="mt-8 flex flex-row flex-wrap justify-center gap-2">
          {Array.from(badgeList).map((badge, idx) => (
            <span
              key={idx}
              className={
                "ring-badges cursor-pointer whitespace-nowrap rounded px-1 py-0.5 text-sm font-semibold shadow-md shadow-black ring-1 " +
                `${pageBadges.indexOf(badge[0]) > -1 ? "bg-violet-200 text-violet-800 " : "text-white"}`
              }
              onClick={() => {
                if (pageBadges.indexOf(badge[0]) > -1) {
                  const newBadges = pageBadges.filter(value => {
                    return !(badge[0] === value);
                  });
                  setValue("badges", newBadges);
                } else {
                  setValue("badges", [...pageBadges, badge[0]]);
                }
              }}
            >
              {badge[1].label}
            </span>
          ))}
        </div>
        <Button id="create-page-btn" type="submit" className="mt-4" label="Save" disabled={isSubmitting} />
      </form>
    </Dialog>
  );
};

export default memo(DialogEditBadges);
