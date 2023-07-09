import { Box } from "@mui/material";
import Header from "../../../reusable_component/Header";

function Dashboard() {
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" subtitle="Welcome to the your dashboard" />
      </Box>
    </Box>
  );
}

export default Dashboard;
