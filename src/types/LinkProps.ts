export interface LinkProps {
  _id: string;
  url: string;
  label: string;
  icon: string;
  bannerUrl: string;
  embedded: string;
  isPlaylist: boolean;
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
