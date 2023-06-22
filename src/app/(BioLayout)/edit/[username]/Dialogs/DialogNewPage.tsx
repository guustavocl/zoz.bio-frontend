import { Button } from "@/components/Buttons";
import Dialog from "@/components/Dialogs";
import { Input } from "@/components/Inputs";
import { checkPagename, createPage } from "@/services/PageService";
import { PageProps } from "@/types/PageProps";
import { errorToast, successToast } from "@/utils/toaster";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type DialogNewPageProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  addNewPage: (page: PageProps) => void;
};

const pagenamesList = [
  "SharKb0y",
  "LavaGr1ll",
  "h0meSlander",
  "El0nFluSheD",
  "Crytp0Boy",
  "XablinhA",
  "Br3ak1NgBeD",
  "LuxC00L",
  "PewDiePie",
  "LewDiePie",
  "Th4n0sTh3M4LL",
  "4TheH0rde",
  "Dr4c4ryS",
  "Le4veMe4l0n3",
  "M4ND4L0R14N",
  "3mpty",
  "YE",
];

const createPageFormSchema = z.object({
  pagename: z
    .string()
    .nonempty("Page name is required")
    .min(4, "Page name must have at least 4 characters")
    .refine(value => /^[a-zA-Z0-9_.]+$/.test(value), "Page Name allows only alphabets, numbers, _ or ."),
});

type CreatePageFormData = z.infer<typeof createPageFormSchema>;

const DialogNewPage = ({ isOpen, setIsOpen, addNewPage }: DialogNewPageProps) => {
  const [pagename, setPagename] = useState("");
  const [isPagenameAvailable, setPagenameAvailable] = useState(true);
  const [examplePagename, setExamplePagename] = useState("");

  const {
    watch,
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreatePageFormData>({ resolver: zodResolver(createPageFormSchema) });

  if (watch("pagename") !== pagename) setPagename(watch("pagename"));

  useEffect(() => {
    if (isOpen) {
      reset();
      setPagename("");
      setExamplePagename(pagenamesList[~~(pagenamesList.length * Math.random())]);
    }
  }, [isOpen]);

  useEffect(() => {
    const pagenameQuery = setTimeout(() => {
      if (pagename && pagename.length > 0)
        checkPagename(pagename)
          .then(response => {
            setPagenameAvailable(response.isAvailable);
          })
          .catch(err => {
            errorToast(err);
          });
    }, 300);
    return () => {
      clearTimeout(pagenameQuery);
    };
  }, [pagename]);

  const submitNewPage = (data: CreatePageFormData) => {
    createPage(data.pagename)
      .then(res => {
        addNewPage(res.page);
        successToast("Page successfully created.");
        setIsOpen(false);
      })
      .catch(err => {
        errorToast(err);
      });
  };

  return (
    <Dialog
      title={
        <>
          Please choose your Page name~
          <br />↪ zoz.bio/
          <span className="text-indigo-500">{pagename ? pagename : examplePagename}</span>
        </>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className="mt-2">
        <p className="text-sm text-gray-400">
          To prevent a rush of BOTs trying to claim all short-sized page names, you can only create pages with at least
          4 characters. However, if you still want a short page name, there are a few ways to obtain one:
          <br />
          1. Subscriptions. (COMING SOON)
          <br />
          2. Prove that you own that page name on other social media platforms such as Instagram, Twitter, TikTok, etc.
          <br />
          3. Future events on Discord. (COMING SOON)
          <br />
          4. Maybe be a nice and lovely person on our Discord server?! 😳
          <br />
          <br />
          Additionally, you can create up to 2 pages per account without any subscription.
        </p>
      </div>

      <form className="mt-4 w-full space-y-2" onSubmit={handleSubmit(submitNewPage)}>
        <Input
          id="pagename"
          type="text"
          label="Page Name"
          placeholder={examplePagename}
          minSize={4}
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
          id="submit-new-page"
          type="submit"
          label="Create page"
          disabled={isSubmitting || !isPagenameAvailable}
        />
      </form>
    </Dialog>
  );
};

export default memo(DialogNewPage);
