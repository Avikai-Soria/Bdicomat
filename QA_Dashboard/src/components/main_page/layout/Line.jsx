import { Box } from "@mui/material";
import Header from "../../../reusable_component/Header.jsx";
import LineChart from "../../../reusable_component/TimelineChart.jsx";
import { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../MainPageContainer";
import apiFetch from "../../../hooks/api";

const Line = () => {
  const { userId, apiKey } = useContext(UserInfoContext);
  const [monthlyStats, setMonthlyStats] = useState([]);

  useEffect(() => {
    apiFetch(`monthlystat`, "GET", apiKey)
      .then((response) => setMonthlyStats(response.data.monthlyStats))
      .catch((err) =>
        alert("Couldn't load monthly Stats... Please refresh the page")
      );
  }, []);

  return (
    <Box m="20px">
      <Header
        title="Bugs & Tests Timeline"
        subtitle="Simple visualization of the amount of bugs and tests per each sprints (month)"
      />
      <Box height="75vh">
        {monthlyStats.length > 0 ? (
          <LineChart monthlyStats={monthlyStats} />
        ) : (
          <p>Waiting...</p>
        )}
      </Box>
    </Box>
  );
};

export default Line;
