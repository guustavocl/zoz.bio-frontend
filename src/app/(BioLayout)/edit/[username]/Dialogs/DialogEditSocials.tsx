import { memo, useEffect, useState } from "react";
import { PageProps, PagePropsSocialMedia } from "@/types/PageProps";
import { PlusIcon, XMarkIcon } from "@heroicons/react/20/solid";
import Dialog from "@/components/Dialogs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { errorToast, successToast } from "@/utils/toaster";
import { saveSocialMedia } from "@/services/PageService";
import { Button } from "@/components/Buttons";
import BioIcon from "@/app/(BioLayout)/[username]/BioIcon";
import { getSocialIcon, socialIconsList } from "@/utils/IconsList";
import { AutoComplete, Input } from "@/components/Inputs";

const createSocialsFormSchema = z.object({
  account: z.string().nonempty("This field is a required"),
});

type CreateSocialsFormData = z.infer<typeof createSocialsFormSchema>;

type DialogEditSocialsProps = {
  isOpen: boolean;
  page: PageProps;
  setIsOpen: (value: boolean) => void;
};

// TODO - refactor
const DialogEditSocials = ({ isOpen, page, setIsOpen }: DialogEditSocialsProps) => {
  const [items, setItems] = useState<PagePropsSocialMedia[]>();
  const [mediaSelected, setMediaSelected] = useState("discord");

  useEffect(() => {
    if (isOpen && page && page.socialMedias) {
      setItems(Object.assign([], page.socialMedias));
    }
  }, [isOpen]);

  const submitNewSocial = (data: CreateSocialsFormData) => {
    if (data.account && items && items.length < 25) {
      if (items?.some(item => item.key === mediaSelected)) {
        errorToast("This account has already been added!");
      } else {
        const newItems = Object.assign([], items);
        newItems?.push({
          key: mediaSelected,
          username: data.account,
        });
        setItems(newItems);
      }
    }
  };

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateSocialsFormData>({
    resolver: zodResolver(createSocialsFormSchema),
    defaultValues: { account: "" },
  });

  const account = watch("account");

  return (
    <Dialog title="Link your accounts" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(submitNewSocial)} className="flex flex-col items-center">
        {/* SOCIALS ADDED */}
        <div className="relative mt-2 flex w-full flex-row flex-wrap gap-1 rounded-md bg-secondary/[0.2] p-4">
          <div className="absolute bottom-0 right-1 text-sm">{items?.length || "0"}/25</div>
          {items?.map((item, idx) => (
            <div key={idx} className="flex flex-col outline-0">
              <BioIcon key={idx} media={item} />
              <div className="flex flex-col items-center">
                <XMarkIcon
                  className="w-7 cursor-pointer font-bold text-red-700 hover:text-red-600"
                  onClick={() => {
                    const newItems = items.filter((value: PagePropsSocialMedia) => {
                      return !(item.key === value.key && item.username === value.username);
                    });
                    setItems(newItems);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
        {/* SOCIALS INPUTS */}
        <div className="mt-4 w-full">
          <AutoComplete
            id="social"
            name="social"
            type="text"
            label="Account"
            selected={mediaSelected}
            list={socialIconsList}
            setSelected={setMediaSelected}
          />
        </div>
        <div className="mt-4 w-full">
          <Input
            id="account"
            type="text"
            label="Username / Url / Id"
            minSize={1}
            size={60}
            watch={watch("account")}
            register={register("account")}
            errorMessage={errors.account?.message}
          />
        </div>
        {mediaSelected ? (
          <div className="mt-4 w-full break-words text-gray-400">
            {getSocialIcon(mediaSelected)?.url?.(account) ? (
              <>
                ↪ will open this url
                <br />
                <a
                  className="group flex flex-row hover:text-gray-200"
                  href={getSocialIcon(mediaSelected)?.url?.(account)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {getSocialIcon(mediaSelected)?.url?.("")}
                  <span className="group text-indigo-500 group-hover:text-indigo-400">
                    <span className="flex group-hover:hidden">{account || "😠 fill the required input"}</span>
                    <span className="hidden group-hover:flex">{account || "😡 fill the required input"}</span>
                  </span>
                </a>
              </>
            ) : (
              <>
                ↪ will be copied to clipboard:
                <br />
                <span
                  className="group h-full cursor-pointer text-indigo-500"
                  onClick={() => {
                    successToast(`Copied: ${account}`);
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(account);
                    }
                  }}
                >
                  <span className="flex group-hover:hidden">{account || "😠 fill the required input"}</span>
                  <span className="hidden group-hover:flex">{account || "😡 fill the required input"}</span>
                </span>
              </>
            )}
          </div>
        ) : null}
        <Button
          id="submit-page-social"
          type="submit"
          className="mt-4"
          label="Add"
          iconAdornment={<PlusIcon className="w-6" />}
          disabled={isSubmitting}
        />

        <button
          type="button"
          className={
            "group relative mt-20 flex w-full justify-center rounded border border-transparent " +
            "text-3x1 px-4 py-2 font-medium hover:font-semibold " +
            "bg-violet-700 text-white hover:bg-violet-900 "
          }
          onClick={() => {
            if (items)
              saveSocialMedia(items, page.pagename)
                .then(() => {
                  setIsOpen(false);
                  window.location.reload();
                })
                .catch(error => {
                  errorToast(error);
                });
          }}
        >
          Save
        </button>
      </form>
    </Dialog>
  );
};

export default memo(DialogEditSocials);
