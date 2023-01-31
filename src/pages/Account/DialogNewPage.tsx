import React, { useEffect, useState } from "react";
import { useToasts } from "../../context/ToastProvider/useToasts";
import { IPage } from "../../types/IPage";
import { CheckIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { ZozInput } from "../../components/Inputs";
import pageService from "../../services/page.service";
import ZozDialog from "../../components/Dialogs";

type DialogNewPageProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  addNewPage: (page: IPage) => void;
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

const DialogNewPage = ({ isOpen, setIsOpen, addNewPage }: DialogNewPageProps) => {
  const [pagename, setPagename] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPagenameAvailable, setPagenameAvailable] = useState(true);
  const [examplePagename, setexamplePagename] = useState("");
  const { errorToast, successToast } = useToasts();

  useEffect(() => {
    if (isOpen) {
      setPagename("");
      setIsSubmitting(false);
      setexamplePagename(pagenamesList[~~(pagenamesList.length * Math.random())]);
    }
  }, [isOpen]);

  useEffect(() => {
    const pagenameQuery = setTimeout(() => {
      if (pagename && pagename.length > 0)
        pageService
          .checkPagename(pagename)
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
  }, [pagename]);

  const createPage = () => {
    if (pagename) {
      setIsSubmitting(true);
      pageService
        .createPage(pagename)
        .then(response => {
          addNewPage(response.page);
          successToast("Page successfully created.");
          setIsOpen(false);
        })
        .catch(error => {
          setIsSubmitting(false);
          errorToast(error.message);
        });
    }
  };

  return (
    <ZozDialog
      title={
        <React.Fragment>
          Please choose your Page name~
          <br />↪ zoz.gg/
          <span className="text-indigo-500">{pagename ? pagename : examplePagename}</span>
        </React.Fragment>
      }
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <React.Fragment>
        <div className="mt-2">
          <p className="text-sm text-gray-400">
            To prevent a BOT rush for get all short size pagenames, you can only create pages with at least 5 characters
            (will be reduced to 4 in a few weaks). If you still wants a short pagename, there&apos;s some ways to get
            one:
            <br />
            1. Subscriptions. (SOON)
            <br />
            2. Prove that you owns that pagename in some other social medias like Instagram, Twitter, TikTok, etc.
            <br />
            3. Future events on discord. (SOON)
            <br />
            4. Be a nicely and lovely person on our discord server maybe?! 😳
            <br />
            <br />
            You can also create up to 2 pages per account without any subscription.
          </p>
        </div>

        <div className="mt-4">
          <ZozInput
            id="pagename"
            name="pagename"
            type="text"
            label="Page Name"
            placeholder={examplePagename}
            minSize={5}
            size={30}
            value={pagename}
            iconAdornment={
              isPagenameAvailable ? (
                <CheckIcon className="w-6 text-green-600" />
              ) : (
                <XMarkIcon className="w-6 text-red-600" />
              )
            }
            errors={isPagenameAvailable ? undefined : "Paganame already taken"}
            onChange={e => {
              const pagename = e.target.value.replace(/[^a-z0-9_-]+|\s+/gim, "");
              setPagename(pagename);
            }}
          />
        </div>

        <button
          type="submit"
          disabled={pagename.length < 5 || isSubmitting || !isPagenameAvailable}
          onClick={createPage}
          className={
            "mt-4 group relative flex w-full justify-center rounded border border-transparent " +
            "py-2 px-4 text-3x1 font-medium hover:font-semibold " +
            `${
              pagename.length < 5 || isSubmitting || !isPagenameAvailable
                ? "bg-violet-800 text-gray-400 "
                : "bg-violet-700 hover:bg-violet-900 text-white "
            }`
          }
        >
          Create page
        </button>
      </React.Fragment>
    </ZozDialog>
  );
};

export default React.memo(DialogNewPage);
