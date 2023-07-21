import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../hooks/theme";
import { mockDataContacts } from "../data/mockData";
import Header from "../../../reusable_component/Header.jsx";
import { useTheme } from "@mui/material";

const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "userId", headerName: "User ID" },
    {
      field: "userName",
      headerName: "User Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "testDescription",
      headerName: "Test Discretion",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "domain",
      headerName: "Domain",
      flex: 1,
    },
    {
      field: "startRunningTime",
      headerName: "Start Running Time",
      flex: 1,
    },
    {
      field: "exceptedResult",
      headerName: "Excepted Result",
      flex: 1,
    },

    {
      field: "result",
      headerName: "Result",
      flex: 1,
    },
    {
      field: "resultDetails",
      headerName: "resultDetails",
      flex: 1,
    },
    {
      field: "duration",
      headerName: "Duration",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="Test Reports" subtitle="List of All Test Reports" />
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
          rows={mockDataContacts}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
