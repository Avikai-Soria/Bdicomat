import { Box, IconButton, useTheme } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ColorModeContext } from "../../../hooks/theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import { useNavigate } from "react-router-dom";
import NotificationButton from "../../../reusable_component/NotificationButton";
import apiFetch from "../../../hooks/api";
import { UserInfoContext } from "../MainPageContainer";
import useLocalStorageState from "../../../hooks/useLocalStorageState";



function Topbar({ handleLogout }) {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const navigate = useNavigate();

  const { apiKey } = useContext(UserInfoContext);

  const [notifications, setNotifications] = useLocalStorageState('notifications', []);

  useEffect(() => {
    if (notifications.length === 0) {
      apiFetch(`notifications?limit=10`, "GET", apiKey)
        .then((response) => setNotifications(response.data.notifications))
        .catch((err) => console.log("Couldn't load notifications..."));
    }
  }, []);
  
  const handleNotImplemented = () => {
    alert("This feature is not implemented yet.")
  }

  const handleLogoutWithConfirmation = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      handleLogout();
    }
  };

  const handleProfileClick = () => {
    navigate("/profile");
  };

  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>

        <NotificationButton notifications={notifications}/>

        <IconButton onClick={handleNotImplemented}>
          <SettingsOutlinedIcon />
        </IconButton>

        <IconButton onClick={handleProfileClick}>
          <PersonOutlinedIcon />
        </IconButton>

        <IconButton onClick={handleLogoutWithConfirmation}>
          <ExitToAppOutlinedIcon />
        </IconButton>

      </Box>
    </Box>
  );
}

export default Topbar;
