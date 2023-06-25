import { Button } from "@/components/Buttons";
import Dialog from "@/components/Dialogs/Dialog";
import { Input, RadioGroup } from "@/components/Inputs";
import { createLink } from "@/services/LinkService";
import { LinkProps } from "@/types/LinkProps";
import { PageProps } from "@/types/PageProps";
import { errorToast } from "@/utils/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type DialogNewLinkProps = {
  isOpen: boolean;
  page: PageProps;
  setIsOpen: (value: boolean) => void;
};

const createLinkFormSchema = z.object({
  url: z.string().nonempty("Url is required"),
  label: z.string().nonempty("Link label is required"),
  icon: z.string(),
  embedded: z.string().nonempty(),
  isFolder: z.boolean(),
  folderOwner: z.string(),
});

const DialogNewLink = ({ isOpen, page, setIsOpen }: DialogNewLinkProps) => {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LinkProps>({
    resolver: zodResolver(createLinkFormSchema),
    defaultValues: { url: "", label: "", icon: "", embedded: "none", isFolder: false, folderOwner: "" },
  });

  const submitLinkInfos = (data: LinkProps) => {
    createLink(data, page.pagename)
      .then(() => {
        setIsOpen(false);
        window.location.reload();
      })
      .catch(error => {
        errorToast(error);
      });
  };

  const isFolder = watch("isFolder");
  return (
    <Dialog title="Inform your Link infos" isOpen={isOpen} setIsOpen={setIsOpen}>
      <form onSubmit={handleSubmit(submitLinkInfos)} className="flex flex-col gap-1">
        <RadioGroup
          id="folder"
          label="Type"
          value={isFolder ? "folder" : "link"}
          options={[
            {
              value: "link",
              component: <span>Link</span>,
            },
            {
              value: "folder",
              component: <span>Folder</span>,
            },
          ]}
          onChange={(value: string) => {
            setValue("isFolder", value === "folder");
            setValue("embedded", "none");
            setValue("url", value === "folder" ? "/" : "");
            setValue("folderOwner", "");
          }}
        />
        <RadioGroup
          id="embedded"
          label="Embedded"
          value={watch("embedded")}
          disabled={isFolder}
          options={[
            {
              value: "none",
              component: <span>None</span>,
            },
            {
              value: "spotify",
              component: <span>Spotify</span>,
              color: "#1ed760",
            },
            {
              value: "youtube",
              component: <span>Youtube</span>,
              color: "#fe0000",
            },
            {
              value: "soundcloud",
              component: <span>Soundcloud</span>,
              color: "#ff5500",
            },
          ]}
          onChange={(value: string) => {
            setValue("embedded", value);
          }}
        />
        {/* <AutoCompleteFolders
            label="Inside Folder"
            pagename={page.pagename}
            selected={formik.values.folderOwner}
            disabled={formik.values.isFolder}
            setSelected={value => {
              formik.setFieldValue("folderOwner", value);
            }}
          /> */}
        <Input
          id="label"
          type="text"
          label="Tittle"
          minSize={1}
          size={30}
          watch={watch("label")}
          register={register("label")}
          errorMessage={errors.label?.message}
        />
        <Input
          id="url"
          type="text"
          label="Url"
          minSize={1}
          size={150}
          disabled={isFolder}
          watch={watch("url")}
          register={register("url")}
          errorMessage={errors.url?.message}
        />
        <Button
          id="submit-page-infos"
          type="submit"
          className="mt-4"
          label={watch("isFolder") ? "Add Folder" : "Add Link"}
          disabled={isSubmitting}
        />
      </form>
    </Dialog>
  );
};

export default memo(DialogNewLink);
