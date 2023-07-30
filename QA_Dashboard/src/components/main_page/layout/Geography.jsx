import { Box, useTheme } from "@mui/material";
import GeographyChart from "../../../reusable_component/GeographyChart.jsx";
import Header from "../../../reusable_component/Header.jsx";
import { tokens } from "../../../hooks/theme";
import { useContext, useEffect } from "react";
import { UserInfoContext } from "../MainPageContainer";
import apiFetch from "../../../hooks/api";
import useLocalStorageState from "../../../hooks/useLocalStorageState.js";

const Geography = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { apiKey } = useContext(UserInfoContext);
  const [geoStats, setGeoStats] = useLocalStorageState('geoStats', []);

  useEffect(() => {
    if (geoStats.length === 0) {
      apiFetch(`geographicstat`, "GET", apiKey)
        .then((response) => setGeoStats(response.data.geographicStats))
        .catch((err) => console.log("Couldn't load geographic's stats..."));
    }
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
