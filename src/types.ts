import { ReactNode } from "react";
import internal from "stream";
import { AvatarProps } from "@mui/material";

type InfoBasic = {
  id: string;
};

type Account = { email: string } & InfoBasic;

export type Profile = ProfileCreate & InfoBasic;
export type Profiles = Profile[];

export type ProfileCreate = {
  title: string;
  call: string;
  category: string;
  avatar: string;
};

export type SignFormData = {
  email: string;
  password: string;
};

export type SignFormProps = {
  pageType: SignPageType;
  setHaveContent: (haveContent: boolean) => void;
};

export type AccountInfo = {
  account: Account;
  profiles: Profile[];
};

export type Token = { body: string };

export type AccountPageProps = {
  accountInfo: AccountInfo;
};
export type SignPageType = "login" | "register";

export type AccountContextType = {
  accountInfo?: AccountInfo;
  updateAccountInfo: () => void;
  switchProfile: (profileID: string) => void;
  currentProfile?: Profile;
};

export type ProfileSwitcherProps = {
  profiles?: Profiles;
};

export type ProfileCardProps = {
  profile: Profile;
  size?: "normal" | "lite";
};

export type MainFrameProps = {
  children?: ReactNode;
};

export type EpisodeData = {
  title: string;
  content: string;
  navPicture: string;
};

export type EpisodeInfo = EpisodeData & InfoBasic & {profile: Profile};

export type PublishCardProps = {
  profileID: string;
  afterSubmit?: (info: EpisodeInfo) => void;
};

export type EpisodeCardProps = {
  episodeInfo: EpisodeInfo;
};

export type FileUploadData = {
  filename: string;
  mime: string;
  size: number;
  category: string;
};

export type StorageEndpoint = {
  storageEndpoint: string;
  storageBucket: string;
};

export type FileInfo = {
  filename: string;
  id: string;
  mime: string;
  note: string;
  path: string;
  sid: string;
  size: number;
  status: string;
};

export type UniversalContextProps = {
  siteName: string;
  storage?: StorageEndpoint;
};

// export type ProfileFormProps = {
//   initial?: {
//     id?: string;
//     onSubmit: (profile: ProfileCreate, id?: string) => void;
//
//   } && ProfileCreate
// }

export interface AvatarWrapProps extends AvatarProps {
  source?: string;
}
