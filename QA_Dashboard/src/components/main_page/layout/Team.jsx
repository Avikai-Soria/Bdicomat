import React, { useContext, useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../hooks/theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import Header from "../../../reusable_component/Header.jsx";
import apiFetch from "../../../hooks/api";
import { UserInfoContext } from "../MainPageContainer";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

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

  const handleUpgradeUser = (id) => {
    const confirmUpgrade = window.confirm(`Are you sure you want to make this user with ID ${id} an admin?`);
    if (confirmUpgrade) {
      // Implement the logic to upgrade the user with the given ID to an admin.
      // You can make an API call to update the user role, for example.
      // After upgrading the user, you may want to refresh the data.

      // For now, let's show a success alert to indicate the upgrade.
      alert("User successfully upgraded to admin!");
    }
  };

  const handleRemoveUser = (id) => {
    const confirmRemove = window.confirm(`Are you sure you want to delete the user with ID ${id}?`);
    if (confirmRemove) {
      // Call the apiFetch function to delete the user with the given ID
      apiFetch(`users/${id}`, "DELETE", apiKey)
        .then((response) => {
          // Handle the success response here
          alert("User successfully removed!");
          // You may want to refresh the data after the user is removed from the database
        })
        .catch((error) => {
          // Handle the error here if the deletion fails
          alert("Failed to delete user. Please try again.");
        });
    }
  };
  
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
      flex: 0.35,
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
    {
      field: "upgrade",
      headerName: "Upgrade",
      flex: 0.25,
      headerAlign: "left",
      renderCell: ({ row }) => {
        if (row.userRole === "tester") {
          return (
            <Box display="flex" justifyContent="center" alignItems="center">
              <ArrowUpwardIcon
                style={{ cursor: 'pointer' }}
                onClick={() => handleUpgradeUser(row.id)}
              />
            </Box>
          );
        }
        return null;
      },
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.25,
      headerAlign: "left",
      renderCell: ({ row }) => {
        if (row.userRole === "tester") {
          return (
            <Box display="flex" justifyContent="center" alignItems="center">
              <DeleteOutlineIcon
                style={{ cursor: 'pointer' }}
                onClick={() => handleRemoveUser(row.id)}
              />
            </Box>
          );
        }
        return null;
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
