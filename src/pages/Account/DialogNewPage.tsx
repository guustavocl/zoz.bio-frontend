import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { LabelInput } from "../../components/Inputs";
import { useToasts } from "../../context/ToastProvider/useToasts";
import pageService from "../../services/page.service";

type DialogNewPageProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
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

const DialogNewPage = ({ isOpen, setIsOpen }: DialogNewPageProps) => {
  const [pagename, setPagename] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [examplePagename, setexamplePagename] = useState("");
  const { errorToast, successToast } = useToasts();

  useEffect(() => {
    if (isOpen === true) {
      setPagename("");
      setIsSubmitting(false);
      setexamplePagename(
        pagenamesList[~~(pagenamesList.length * Math.random())]
      );
    }
  }, [isOpen]);

  useEffect(() => {
    const pagenameQuery = setTimeout(() => {
      console.log("query pagename");
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
        .then((response) => {
          console.log(response);
          successToast("Page successfully created.");
          setIsOpen(false);
        })
        .catch((error) => {
          console.log(error);
          setIsSubmitting(false);
          errorToast(error.message);
        });
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-5" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-primary p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-200"
                >
                  Please choose your Page name~
                  <br />↪ zoz.gg/
                  <span className="text-indigo-500">
                    {pagename ? pagename : examplePagename}
                  </span>
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-400">
                    To prevent a BOT rush for get all short size pagenames, you
                    can only create pages with at least 5 characters (will be
                    reduced to 4 in a few weaks). If you still wants a short
                    pagename, there's some ways to get one:
                    <br />
                    1. Subscriptions. (SOON)
                    <br />
                    2. Prove that you owns that pagename in some other social
                    medias like Instagram, Twitter, TikTok, etc.
                    <br />
                    3. Future events on discord. (SOON)
                    <br />
                    4. Be a nicely and lovely person on our discord server
                    maybe?! 😳
                    <br />
                    <br />
                    You can also create up to 2 pages per account without any
                    subscription.
                  </p>
                </div>

                <div className="mt-4">
                  <LabelInput
                    id="pagename"
                    name="pagename"
                    type="text"
                    label="pagename"
                    placeholder={examplePagename}
                    minSize={5}
                    size={30}
                    value={pagename}
                    onChange={(e) => {
                      let pagename = e.target.value.replace(
                        /[^a-z0-9_-]+|\s+/gim,
                        ""
                      );
                      setPagename(pagename);
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={pagename.length < 5 || isSubmitting}
                  onClick={createPage}
                  className={
                    "mt-4 group relative flex w-full justify-center rounded border border-transparent " +
                    "py-2 px-4 text-3x1 font-medium hover:font-semibold" +
                    "focus:outline-none focus:ring-0 focus:ring-indigo-500 focus:ring-offset-0 " +
                    `${
                      pagename.length < 5 || isSubmitting
                        ? "bg-violet-800 text-gray-400"
                        : "bg-violet-700 hover:bg-violet-900 text-white"
                    }`
                  }
                >
                  Create page
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default DialogNewPage;
