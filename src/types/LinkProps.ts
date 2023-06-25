export interface LinkProps {
  _id: string;
  url: string;
  label: string;
  icon: string;
  embedded: string;
  isHidden: boolean;
  isFolder: boolean;
  isSelected: boolean;
  position: number;
  timesClicked: number;
  createdAt: Date;
  updatedAt: Date;
  pageOwner: string;
  folderOwner: string;
}
