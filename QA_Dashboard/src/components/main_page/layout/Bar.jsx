import { Box } from "@mui/material";
import Header from "../../../reusable_component/Header.jsx";
import BarChart from "../../../reusable_component/DomainChart.jsx";
import { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../MainPageContainer";
import apiFetch from "../../../hooks/api";

const DomainChart = () => {
  const { userId, apiKey } = useContext(UserInfoContext);
  const [domainStats, setDomainStats] = useState([]);

  useEffect(() => {
    apiFetch(`domainstat`, "GET", apiKey)
      .then((response) => setDomainStats(response.data.domainStats))
      .catch((err) => alert("Couldn't load domain's stats... Please refresh the page"));
  }, []);

  return (
    <Box m="20px">
      <Header
        title="Domain Chart"
        subtitle="Simple Bar Chart that visualize the activity on each of the domains"
      />
      <Box height="75vh">
        {/* Render BarChart only when domainStats data is available */}
        {domainStats ? <BarChart domainStats={domainStats} /> : <p>Waiting...</p>}
      </Box>
    </Box>
  );
};

export default DomainChart;
