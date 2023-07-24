import { Box } from "@mui/material";
import Header from "../../../reusable_component/Header.jsx";
import LineChart from "../../../reusable_component/TimelineChart.jsx";

const Line = () => {
  return (
    <Box m="20px">
      <Header
        title="Bugs & Tests Timeline"
        subtitle="Simple visualization of the amount of bugs and tests per each sprints (month)"
      />
      <Box height="75vh">
        <LineChart />
      </Box>
    </Box>
  );
};

export default Line;
