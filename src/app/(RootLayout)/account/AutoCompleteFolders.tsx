import React, { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { AutoComplete } from "@/components/Inputs";
import { LinkProps } from "@/types/LinkProps";
import { MediaIconProps } from "@/types/MediaIconProps";
import { getIcon } from "@/utils/IconsList";
import { getFolders } from "@/services/LinkService";
import { errorToast } from "@/utils/toaster";

type AutoCompleteFoldersProps = {
  label: string;
  pagename: string;
  disabled?: boolean;
  iconAdornment?: JSX.Element;
  selected?: string;
  setSelected: (value: string) => void;
};

const AutoCompleteFolders = ({
  label,
  disabled = false,
  pagename,
  selected = "",
  setSelected,
}: AutoCompleteFoldersProps) => {
  const queryPage = useQuery({
    queryKey: ["getFolders"],
    queryFn: () => getFolders(pagename),
  });

  if (queryPage.isError) {
    const error = queryPage.error as Error;
    errorToast(error);
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
    <AutoComplete
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

export default memo(AutoCompleteFolders);
