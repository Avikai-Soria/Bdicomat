import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../../hooks/theme";
import { mockDataBugReports } from "../data/mockData";
import Header from "../../../reusable_component/Header.jsx";

const BugReports = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
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
      field: "version",
      headerName: "Version",
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

  return (
    <Box m="20px">
      <Header title="BugReports" subtitle="List of All <Username> Bug Reports" />
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
        <DataGrid rows={mockDataBugReports} columns={columns} />
      </Box>
    </Box>
  );
};

export default BugReports;
