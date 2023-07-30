import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../hooks/theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../../reusable_component/Header.jsx";
import apiFetch from "../../../hooks/api";
import { UserInfoContext } from "../MainPageContainer";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);

  const { apiKey } = useContext(UserInfoContext);

  useEffect(() => {
    apiFetch(`users`, "GET", apiKey)
      .then((response) => setData(response.data))
      .catch((err) => alert("Couldn't load users... Please refresh the page"));
  }, []);

  const columns = [
    { field: "id", headerName: "User ID", flex: 0.1 },
    {
      field: "name",
      headerName: "Full Name",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    { field: "username", headerName: "Username", flex: 0.5 },
    {
      field: "email",
      headerName: "Email",
      flex: 0.75,
    },
    {
      field: "userRole",
      headerName: "User Role",
      headerAlign: "center",
      flex: 0.8,
      renderCell: ({ row: { userRole } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              userRole === "admin"
                ? colors.greenAccent[600]
                : colors.redAccent[600]
            }
            borderRadius="4px"
          >
            {userRole === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {userRole === "tester" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {userRole}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="TEAM" subtitle="Managing the Team Members" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid rows={data} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
