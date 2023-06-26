import { Button } from "@/components/Buttons";
import Dialog from "@/components/Dialogs/Dialog";
import { Input, RadioGroup } from "@/components/Inputs";
import { updateLink } from "@/services/LinkService";
import { LinkProps } from "@/types/LinkProps";
import { PageProps } from "@/types/PageProps";
import { errorToast } from "@/utils/toaster";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AutoCompleteFolders from "../AutoCompleteFolders";

type DialogEditLinkProps = {
  page: PageProps;
  link: LinkProps;
  setSelectedLink: (value: LinkProps | null) => void;
};

const createLinkFormSchema = z.object({
  _id: z.string(),
  url: z.string().nonempty("Url is required"),
  label: z.string().nonempty("Link label is required"),
  embedded: z.string().nonempty(),
  isFolder: z.boolean(),
  folderOwner: z.string().nullish(),
});

// TODO - add banner to form
const DialogEditLink = ({ page, link, setSelectedLink }: DialogEditLinkProps) => {
  const {
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LinkProps>({
    resolver: zodResolver(createLinkFormSchema),
    defaultValues: {
      _id: link._id,
      url: link.url,
      label: link.label,
      embedded: link.embedded,
      isFolder: link.isFolder,
      folderOwner: link.folderOwner,
    },
  });

  const submitLinkInfos = (data: LinkProps) => {
    console.log("asubnm");
    updateLink(data, page.pagename)
      .then(() => {
        setSelectedLink(null);
        window.location.reload();
      })
      .catch(error => {
        errorToast(error);
      });
  };

  const isFolder = watch("isFolder");
  return (
    <Dialog
      title="Edit your Link infos"
      isOpen={link != null}
      setIsOpen={() => {
        setSelectedLink(null);
      }}
    >
      <form onSubmit={handleSubmit(submitLinkInfos)} className="flex flex-col gap-1">
        <Button
          id="delete-page-link"
          type="button"
          className="mt-4 bg-red-700 hover:bg-red-800 w-auto self-center"
          label={watch("isFolder") ? "Delete Folder" : "Delete Link"}
          disabled={isSubmitting}
          onClick={() => {
            console.log("will remove link");
          }}
        />
        <RadioGroup
          id="folder"
          label="Type"
          disabled
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
        {/* TODO - this is bugged on mobile */}
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
        <AutoCompleteFolders
          label="Inside Folder"
          pagename={page.pagename}
          selected={watch("folderOwner")}
          disabled={isFolder}
          setSelected={value => {
            setValue("folderOwner", value);
          }}
        />
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
          id="edit-page-link"
          type="submit"
          className="mt-4"
          label={watch("isFolder") ? "Save Folder" : "Save Link"}
          disabled={isSubmitting}
        />
      </form>
    </Dialog>
  );
};

export default memo(DialogEditLink);
