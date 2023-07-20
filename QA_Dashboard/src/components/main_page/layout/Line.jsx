import { Box } from "@mui/material";
import Header from "../../../reusable_component/Header.jsx";
import LineChart from "../../../reusable_component/LineChart.jsx";

const Line = () => {
  return (
    <Box m="20px">
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
