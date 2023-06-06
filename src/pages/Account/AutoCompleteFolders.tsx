import React from "react";
import { getIcon, MediaIconProps } from "../Page/IconsList";
import { useQuery } from "@tanstack/react-query";
import { useToasts } from "../../context/ToastProvider/useToasts";
import linkService from "../../services/link.service";
import { ZozAutoComplete } from "../../components/Inputs";
import { LinkProps } from "../../types/LinkProps";

type AutoCompleteFoldersProps = {
  label: string;
  pagename: string;
  disabled?: boolean;
  iconAdornment?: JSX.Element;
  selected?: string;
  setSelected: (value: string) => void;
  onBlur?: (e: React.ChangeEvent<any>) => void;
};

const AutoCompleteFolders = ({
  label,
  disabled = false,
  pagename,
  selected = "",
  setSelected,
}: AutoCompleteFoldersProps) => {
  const { errorToast } = useToasts();

  const queryPage = useQuery({
    queryKey: ["getFolders"],
    queryFn: () => linkService.getFolders(pagename),
  });

  if (queryPage.isError) {
    const error = queryPage.error as Error;
    errorToast(error.message);
  }

  const list = new Map<string, MediaIconProps>([]);
  list.set("", {
    icon: getIcon("banned")?.icon || "",
    label: "None",
  });
  if (queryPage.data?.folders) {
    queryPage.data.folders.map((folder: LinkProps) => {
      list.set(folder._id, {
        icon: getIcon(folder.icon)?.icon || "",
        label: folder.label,
      });
    });
  }

  return (
    <ZozAutoComplete
      id="folder"
      name="folder"
      type="text"
      label={label}
      selected={selected}
      list={list}
      disabled={disabled}
      setSelected={setSelected}
    />
  );
};

export default React.memo(AutoCompleteFolders);
