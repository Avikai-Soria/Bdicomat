import { Box } from "@mui/material";
import Header from "../../../reusable_component/Header.jsx";
import PieChart from "../../../reusable_component/PieChart.jsx";

const Pie = () => {
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Pie;