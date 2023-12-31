import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../hooks/theme";
import Header from "../../../reusable_component/Header.jsx";
import { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../MainPageContainer";
import apiFetch from "../../../hooks/api";
import { IconButton } from "@mui/material";
import { PlayArrowOutlined } from "@mui/icons-material";

const TestReports = ({ isMobile }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { userId, apiKey } = useContext(UserInfoContext);
  const [tests, setTests] = useState([]);

  useEffect(() => {
    apiFetch(`tests`, "GET", apiKey)
      .then((response) => setTests(response.data.tests))
      .catch((err) => alert("Couldn't load tests... Please refresh the page"));
  }, []);

  const desktopColumns = [
    { field: "id", headerName: "Test ID", flex: 0.3 },
    {
      field: "name",
      headerName: "Test Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "description",
      headerName: "Test Discretion",
      flex: 1.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "domain",
      headerName: "Domain",
      flex: 0.5,
    },
    {
      field: "version",
      headerName: "Version",
      flex: 0.5,
    },
    {
      field: "lastTestRunStartTest",
      headerName: "Last Running Time",
      flex: 1,
    },
    {
      field: "expectedResult",
      headerName: "Excepted Result",
      flex: 1.5,
    },

    {
      field: "lastTestRunStatus",
      headerName: "Last status",
      flex: 0.5,
      renderCell: (params) => (
        <Typography
          color={
            params.row.lastTestRunStatus === "pass"
              ? colors.greenAccent[500]
              : params.row.lastTestRunStatus === "fail"
                ? colors.redAccent[500]
                : colors.blueAccent[300]
          }
        >
          {params.row.lastTestRunStatus}
        </Typography>
      ),
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
    },
    {
      field: "runButton",
      headerName: "Run",
      flex: 1,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleRunButtonClick(params.row.id)}
          color="primary"
          style={{ backgroundColor: "green" }}
        >
          <PlayArrowOutlined />
        </IconButton>
      ),
    },
  ];

  const mobileColumns = [
    {
      field: "name",
      headerName: "Test Name",
      flex: 1.5,
      cellClassName: "name-column--cell",
    },
    
    {
      field: "lastTestRunStatus",
      headerName: "Last status",
      flex: 1,
      renderCell: (params) => (
        <Typography
          color={
            params.row.lastTestRunStatus === "pass"
              ? colors.greenAccent[500]
              : params.row.lastTestRunStatus === "fail"
                ? colors.redAccent[500]
                : colors.blueAccent[300]
          }
        >
          {params.row.lastTestRunStatus}
        </Typography>
      ),
    },
    {
      field: "runButton",
      headerName: "Run",
      flex: 1,
      renderCell: (params) => (
        <IconButton
          onClick={() => handleRunButtonClick(params.row.id)}
          color="primary"
          style={{ backgroundColor: "green" }}
        >
          <PlayArrowOutlined />
        </IconButton>
      ),
    },
  ];

  const columns = isMobile ? mobileColumns : desktopColumns;

  const handleRunButtonClick = async (testId) => {
    const body = {
      testId: testId,
      userId: userId,
    };

    try {
      const response = await apiFetch(`testruns`, "POST", apiKey, body);

      if (response.statusCode === 201) {
        alert("Test run succeeded. Results can be viewed in the dashboard.");
      } else {
        alert("Test run failed. Please try again later.");
      }
    } catch (error) {
      console.error("Error running the test:", error);
      alert("An error occurred while running the test. Please try again later.");
    }
  };

  return (
    <Box m="20px">
      <Header title="Tests" subtitle="List of All Tests" />
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={tests}
          columns={columns}
          componentsProp={{
            Toolbar: GridToolbar,
          }}
        />
      </Box>
    </Box>
  );
};

export default TestReports;
