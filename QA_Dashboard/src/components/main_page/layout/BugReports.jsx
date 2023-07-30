import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../hooks/theme";
import Header from "../../../reusable_component/Header.jsx";
import { useContext, useEffect } from "react";
import { UserInfoContext } from "../MainPageContainer";
import apiFetch from "../../../hooks/api";
import useLocalStorageState from "../../../hooks/useLocalStorageState";


const BugReports = ({ isMobile }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { apiKey } = useContext(UserInfoContext);
  const [bugs, setBugs] = useLocalStorageState('bugs', []);

  useEffect(() => {
    // If bugs is the default value (in this case, an empty array), fetch the data
    if (bugs.length === 0) {
      apiFetch(`bugs`, "GET", apiKey)
        .then((response) => setBugs(response.data.bugs))
        .catch((err) => alert("Couldn't load bugs... Please refresh the page"));
    }
  }, []);
  


  const desktopColumns = [
    { field: "id", headerName: "Bug ID", flex: 0.5 },
    {
      field: "testId",
      headerName: "Test ID",
      flex: 0.5,
    },
    {
      field: "userName",
      headerName: "User Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "bugDescription",
      headerName: "Bug Description",
      flex: 3,
    },
    {
      field: "domain",
      headerName: "Domain",
      flex: 1,
    },
    {
      field: "version",
      headerName: "Version",
      flex: 1,
    },
    {
      field: "location",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
    },
    {
      field: "isExcepted",
      headerName: "Is Excepted?",
      flex: 1,
      renderCell: (params) => (
        <Typography
          color={
            params.row.isExcepted === "yes"
              ? colors.greenAccent[500]
              : colors.redAccent[500]
          }
        >
          {params.row.isExcepted}
        </Typography>
      ),
    },
  ];

  const mobileColumns = [
    {
      field: "userName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "bugDescription",
      headerName: "Bug Description",
      flex: 3,
    },
    {
      field: "isExcepted",
      headerName: "Excepted?",
      flex: 1,
      renderCell: (params) => (
        <Typography
          color={
            params.row.isExcepted === "yes"
              ? colors.greenAccent[500]
              : colors.redAccent[500]
          }
        >
          {params.row.isExcepted}
        </Typography>
      ),
    },
  ];


  const columns = isMobile ? mobileColumns : desktopColumns;

  return (
    <Box m="20px">
      <Header title="Bug Reports" subtitle="List of All Bug Reports" />
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
        <DataGrid rows={bugs} columns={columns} />
      </Box>
    </Box>
  );
};

export default BugReports;
