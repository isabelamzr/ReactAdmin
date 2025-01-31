import React from "react";
import { Box, IconButton, useTheme, Typography } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";

const Topbar = ({ pageTitle, pageSubtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      mt={2}
      ml={3}
      mr={2}
      mb={2}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography
            variant="h2"
            color={colors.grey[100]}
            fontWeight="bold"
            sx={{ m: "0 0 5px 0" }}
          >
            {pageTitle}
          </Typography>
          {pageSubtitle && (
            <Typography variant="h5" color={colors.greenAccent[400]}>
              {pageSubtitle}
            </Typography>
          )}
        </Box>

        {/* ICONS */}
        <Box display="flex" alignItems="center">
          <IconButton onClick={colorMode.toggleColorMode}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlinedIcon />
            ) : (
              <LightModeOutlinedIcon />
            )}
          </IconButton>

          <IconButton>
            {" "}
            <NotificationsOutlinedIcon />{" "}
          </IconButton>
          <IconButton>
            {" "}
            <SettingsOutlinedIcon />{" "}
          </IconButton>
          <IconButton>
            {" "}
            <PersonOutlinedIcon />{" "}
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Topbar;
