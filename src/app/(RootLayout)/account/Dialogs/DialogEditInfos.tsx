import { Button } from "@/components/Buttons";
import Dialog from "@/components/Dialogs";
import { Input } from "@/components/Inputs";
import { checkPagename, savePageInfos } from "@/services/PageService";
import { PageProps } from "@/types/PageProps";
import { errorToast, successToast } from "@/utils/toaster";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createInfosFormSchema = z.object({
  uname: z.string().nonempty("Display Name is required").min(1, "Display Name must have at least 4 characters"),
  bio: z.string(),
  pagename: z
    .string()
    .nonempty("Page name is required")
    .min(4, "Page name must have at least 4 characters")
    .refine(value => /^[a-zA-Z0-9_.]+$/.test(value), "Page Name allows only alphabets, numbers, _ or ."),
});

type CreateInfosFormData = z.infer<typeof createInfosFormSchema>;

type DialogEditInfosProps = {
  isOpen: boolean;
  page: PageProps;
  setIsOpen: (value: boolean) => void;
  savePage: (value: PageProps | undefined) => void;
  addNewPage?: (page: PageProps) => void;
};

const DialogEditInfos = ({ isOpen, setIsOpen, page, savePage }: DialogEditInfosProps) => {
  const [newPagename, setNewPagename] = useState("");
  const [isPagenameAvailable, setPagenameAvailable] = useState(true);

  useEffect(() => {
    const pagenameQuery = setTimeout(() => {
      if (page?.pagename && newPagename === page.pagename) {
        setPagenameAvailable(true);
      } else if (newPagename && newPagename.length > 0)
        checkPagename(newPagename)
          .then(response => {
            setPagenameAvailable(response.isAvailable);
          })
          .catch(error => {
            errorToast(error.message);
          });
    }, 300);
    return () => {
      clearTimeout(pagenameQuery);
    };
  }, [newPagename]);

  const submitPageInfos = (data: CreateInfosFormData) => {
    savePageInfos(data.uname, data.bio, page.pagename, newPagename?.length > 1 ? newPagename : page.pagename)
      .then(response => {
        successToast(response.message);
        savePage(response.page);
        setIsOpen(false);
      })
      .catch(error => {
        errorToast(error);
      });
  };

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateInfosFormData>({
    resolver: zodResolver(createInfosFormSchema),
    defaultValues: { uname: page?.uname, bio: page?.bio, pagename: page?.pagename },
  });

  if (watch("pagename") !== newPagename) setNewPagename(watch("pagename"));

  return (
    <Dialog title="Edit your personal infos" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(submitPageInfos)}>
        <Input
          id="uname"
          type="text"
          label="Display Name"
          minSize={1}
          size={25}
          watch={watch("uname")}
          register={register("uname")}
          errorMessage={errors.uname?.message}
        />
        <Input
          id="bio"
          type="textarea"
          label="Bio"
          size={200}
          watch={watch("bio")}
          register={register("bio")}
          errorMessage={errors.bio?.message}
        />
        <Input
          id="pagename"
          type="text"
          label="Page Name"
          placeholder={newPagename}
          minSize={5}
          size={30}
          watch={watch("pagename")}
          register={register("pagename")}
          errorMessage={isPagenameAvailable ? errors.pagename?.message : "Paganame already taken"}
          iconAdornment={
            isPagenameAvailable ? (
              <CheckIcon className="w-6 text-green-600" />
            ) : (
              <XMarkIcon className="w-6 text-red-600" />
            )
          }
        />
        <Button
          id="create-page-btn"
          type="submit"
          className="mt-4"
          label="Save"
          disabled={isSubmitting || !isPagenameAvailable}
        />
      </form>
    </Dialog>
  );
};

export default memo(DialogEditInfos);
