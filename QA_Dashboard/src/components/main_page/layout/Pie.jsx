import { Box } from "@mui/material";
import Header from "../../../reusable_component/Header.jsx";
import PieChart from "../../../reusable_component/CoverageChart.jsx";

const Pie = () => {
  return (
    <Box m="20px">
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="35vh"
      >
        <PieChart />
        <PieChart />
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="35vh"
      >
        <PieChart />
        <PieChart />
      </Box>
    </Box>
  );
};

export default Pie;
