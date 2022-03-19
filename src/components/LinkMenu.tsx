import React, { useContext, useMemo } from "react";
import { LoadingButton } from "@mui/lab";
import { Typography, Box, Button, Stack } from "@mui/material";
import { Link } from "react-router-dom";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DriveFileRenameOutlineOutlinedIcon from "@mui/icons-material/DriveFileRenameOutlineOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import UniversalContext from "@/context/UniversalContext";
import AccountContext from "@/context/AccountContext";
import { AccountContextType, Profiles, UniversalContextProps } from "@/types";
import MenuFrame from "@/pages/frame/MenuFrame";

const commonButtonProps = {
  fullWidth: true,
  sx: {
    borderRadius: "9999px",
    "&:hover": {
      backgroundColor: "action.hover",
    },
    padding: "0.75rem",
    color: "text.primary",
    textTransform: "none",
    justifyContent: "flex-start",
  },
  size: "large",
};

const routers = (profiles: Profiles | undefined) => [
  { name: "home", icon: <HomeOutlinedIcon />, link: "/" },
  {
    name: "series",
    icon: <LibraryBooksOutlinedIcon />,
    link: "/series",
    disabled: !profiles?.length,
  },
  {
    name: "publish",
    icon: <DriveFileRenameOutlineOutlinedIcon />,
    link: "/publish",
    disabled: !profiles?.length,
  },
  {
    name: "quick publish",
    icon: <DriveFileRenameOutlineOutlinedIcon />,
    link: "/quick",
    disabled: !profiles?.length,
  },
];

const LinkMenu = () => {
  const { loginStatus, account, profiles } = useContext(AccountContext);
  const { siteName } = useContext(UniversalContext);
  const router = useMemo(() => routers(profiles), [profiles]);
  return (
    <MenuFrame title={siteName} hideBack={true}>
      {/* 
  // @ts-ignore: see https://github.com/mui-org/material-ui/issues/7877 */}
      <LoadingButton
        component={Link}
        to="/account"
        {...commonButtonProps}
        loading={loginStatus == null}
        disabled={loginStatus == null}
      >
        <Box display="flex" gap="0.75rem">
          <AccountCircleOutlinedIcon />
          {account?.email ? account.email : "login / register"}
        </Box>
      </LoadingButton>
      {router.map((route, index) => {
        if (route.disabled) return null;
        return (
          // @ts-ignore: see https://github.com/mui-org/material-ui/issues/7877
          <Button
            component={Link}
            {...commonButtonProps}
            to={route.link}
            key={index}
          >
            <Box display="flex" gap="0.75rem">
              {route.icon} {route.name}
            </Box>
          </Button>
        );
      })}
    </MenuFrame>
  );
};

export default LinkMenu;
