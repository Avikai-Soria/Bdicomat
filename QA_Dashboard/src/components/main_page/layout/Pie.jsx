import { Box } from "@mui/material";
import Header from "../../../reusable_component/Header.jsx";
import PieChart from "../../../reusable_component/CoverageChart.jsx";

import { mockPieData as data } from "../..//main_page/data/mockData.js";

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
        <PieChart data={data} title={"Negative:"}/>
        <PieChart data={data} title={"Functional:"}/>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="35vh"
      >
        <PieChart data={data} title={"End to end:"}/>
        <PieChart data={data} title={"Performance:"}/>
      </Box>
    </Box>
  );
};

export default Pie;
