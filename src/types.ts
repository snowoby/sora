import React, { ReactNode } from "react";
import internal from "stream";
import { AvatarProps, GridProps } from "@mui/material";

type InfoBasic = {
  id: string;
  create_time: string;
  update_time: string;
  valueType: string;
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
  profiles: Profiles;
};

export type Token = { body: string };

export type AccountPageProps = {
  accountInfo: AccountInfo;
};
export type SignPageType = "login" | "register";

export type AccountContextType = {
  loginStatus?: boolean;
  account?: Account;
  profiles?: Profiles;
  series?: Series[];
  updateAccount: () => void;
};

export type ProfileSwitcherProps = {
  selected?: Profile;
  profiles: Profiles;
  disabled?: boolean;
  children?: React.ReactNode;
  onChange: (profile: Profile) => void;
};

export type ProfileCardProps = {
  profile: Profile;
  size?: "normal" | "lite" | "display" | "avatar";
};

export type FrameProps = {
  left?: ReactNode
  center?: ReactNode
  right?: ReactNode
  title?: ReactNode
  leftGridProps?:GridProps
  centerGridProps?:GridProps
  rightGridProps?:GridProps
};

export type MiddleFrameProps = {hideMdTitle?:boolean} & FrameProps

export type EpisodeData = {
  title: string;
  content: string;
  cover?: string;
};

export type Episode = EpisodeData &
  InfoBasic & {
    profile: Profile;
    series?: Series;
    cover?: FileInfo;
    files?: FileInfo[];
    commentCount?:number;
  };

export type PublishCardProps = {
  profileID: string;
  afterSubmit?: (info: Episode) => void;
};

export type EpisodeCardProps = {
  episode: Episode;
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

export type FileStatus = "uploading" | "uploaded" | "failed"| "deleted";
export type FileUploadingStatus = "uploading"|"creating"|"processing"|"failed"|"uploaded"
export type FileUploadProps = {
  fileStatus: FileStatus;
  uploadingStatus: FileUploadingStatus;
  controller?: AbortController;
  progress?: number;
  dataUrl?: string;
  fileInfo?: FileInfo;
  localFile?: File|Blob;
}

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

export type SeriesData = {
  id: string | null;
  title: string;
  type: string;
  profileID: string;
};

export type Series = InfoBasic & SeriesData & { profile: Profile };

export type HomeTimelineContextType = {
  timeline?: Episode[]
  setTimeline: React.Dispatch<React.SetStateAction<Episode[] | undefined>>
}

export type Comment = {
  id: string;
  content: string;
  author:Profile;
}