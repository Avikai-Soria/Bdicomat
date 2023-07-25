import { Box, useTheme } from "@mui/material";
import GeographyChart from "../../../reusable_component/GeographyChart.jsx";
import Header from "../../../reusable_component/Header.jsx";
import { tokens } from "../../../hooks/theme";
import { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../MainPageContainer";
import apiFetch from "../../../hooks/api";

const Geography = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { userId, apiKey } = useContext(UserInfoContext);
  const [geoStats, setGeoStats] = useState([]);

  useEffect(() => {
    apiFetch(`geographicstat`, "GET", apiKey)
      .then((response) => setGeoStats(response.data.domainStats))
      .catch((err) => alert("Couldn't load geographic's stats... Please refresh the page"));
  }, []);


  return (
    <Box m="20px">
      <Header title="Geography" subtitle="Simple Geography Chart" />

      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
      >
        {geoStats ? <GeographyChart geoStats={geoStats} /> : <p>Waiting...</p>}

      </Box>
    </Box>
  );
};

export default Geography;
