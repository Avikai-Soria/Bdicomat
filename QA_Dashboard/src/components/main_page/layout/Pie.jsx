import { Box } from "@mui/material";
import Header from "../../../reusable_component/Header.jsx";
import PieChart from "../../../reusable_component/CoverageChart.jsx";

import { useContext, useEffect } from "react";
import { UserInfoContext } from "../MainPageContainer";
import apiFetch from "../../../hooks/api";
import useLocalStorageState from "../../../hooks/useLocalStorageState.js";

const Pie = ({ isMobile }) => {

  const { apiKey } = useContext(UserInfoContext);
  const [typeStats, setTypeStats] = useLocalStorageState('typeStats', []);

  useEffect(() => {
    if (typeStats.length === 0) {
      apiFetch(`typestat`, "GET", apiKey)
        .then((response) => setTypeStats(response.data.typeStats))
        .catch((err) => alert("Couldn't load type's stats... Please refresh the page"));
    }
  }, []);
  
  if (typeStats === undefined || typeStats.length === 0)
    return <p>Loading...</p>

  return (
    <Box m="20px">
      <Header title="Coverage Chart" subtitle="Simple Pie Chart" />
      {isMobile ? (
        // If isMobile is true, show only one chart per row
        typeStats.map((data) => (
          <Box
            key={data.type}
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="35vh"
          >
            <PieChart data={data} title={data.type} />
          </Box>
        ))
      ) : (
        // If isMobile is false, show two charts per row
        <>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="35vh"
          >
            <PieChart data={typeStats[0]} title={typeStats[0].type} />
            <PieChart data={typeStats[1]} title={typeStats[1].type} />
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="35vh"
          >
            <PieChart data={typeStats[2]} title={typeStats[2].type} />
            <PieChart data={typeStats[3]} title={typeStats[3].type} />
          </Box>
        </>
      )}
    </Box>
  );
};

export default Pie;

