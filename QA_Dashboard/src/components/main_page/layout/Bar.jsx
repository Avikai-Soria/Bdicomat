import { Box } from "@mui/material";
import Header from "../../../reusable_component/Header.jsx";
import BarChart from "../../../reusable_component/BarChart.jsx";

const DomainChart = () => {
  return (
    <Box m="20px">
      <Header
        title="Domain Chart"
        subtitle="Simple Bar Chart that visualize the activity on each of the domains"
      />
      <Box height="75vh">
        <BarChart />
      </Box>
    </Box>
  );
};

export default DomainChart;
