import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../hooks/theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import RuleIcon from "@mui/icons-material/Rule";
import Header from "../../../reusable_component/Header.jsx";
import LineChart from "../../../reusable_component/TimelineChart";
import GeographyChart from "../../../reusable_component/GeographyChart";
import BarChart from "../../../reusable_component/DomainChart.jsx";
import StatBox from "../../../reusable_component/StatBox";
import PieChart from "../../../reusable_component/CoverageChart";
import ProgressCircle from "../../../reusable_component/ProgressCircle";
import RecentTests from "../../../reusable_component/RecentTests";
import RunningTests from "../../../reusable_component/RunningTests";
import { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../MainPageContainer";
import apiFetch from "../../../hooks/api";
import useWindowSize from "../../../hooks/useWindowSize";
import useLocalStorageState from "../../../hooks/useLocalStorageState";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { apiKey } = useContext(UserInfoContext);
  const [domainStats, setDomainStats] = useLocalStorageState("domainStats", []);
  const [monthlyStats, setMonthlyStats] = useLocalStorageState(
    "monthlyStats",
    []
  );
  const [geoStats, setGeoStats] = useLocalStorageState("geoStats", []);
  const [recentTests, setRecentTests] = useState([]);
  const [typeStats, setTypeStats] = useLocalStorageState("typeStats", []);

  const size = useWindowSize();
  const isMobile = size.width <= 768;

  useEffect(() => {
    if (domainStats.length === 0) {
      apiFetch(`domainstat`, "GET", apiKey)
        .then((response) => setDomainStats(response.data.domainStats))
        .catch((err) => console.log("Couldn't load domain's stats..."));
    }
  }, []);

  useEffect(() => {
    if (monthlyStats.length === 0) {
      apiFetch(`monthlystat`, "GET", apiKey)
        .then((response) => setMonthlyStats(response.data.monthlyStats))
        .catch((err) => console.log("Couldn't load monthly Stats..."));
    }
  }, []);

  useEffect(() => {
    if (geoStats.length === 0) {
      apiFetch(`geographicstat`, "GET", apiKey)
        .then((response) => setGeoStats(response.data.geographicStats))
        .catch((err) => console.log("Couldn't load geographic's stats..."));
    }
  }, []);

  useEffect(() => {
    apiFetch(`testruns?limit=10`, "GET", apiKey)
      .then((response) => setRecentTests(response.data.testRuns))
      .catch((err) => console.log("Couldn't load recent tests..."));
  }, []);

  useEffect(() => {
    if (typeStats.length === 0) {
      apiFetch(`typestat`, "GET", apiKey)
        .then((response) => setTypeStats(response.data.typeStats))
        .catch((err) =>
          alert("Couldn't load type's stats... Please refresh the page")
        );
    }
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              transform: isMobile ? "scale(0.8)" : "scale(1)",
              transformOrigin: "top left",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns={{ xs: "1fr", md: "repeat(12, 1fr)" }}
        gridAutoRows={{ xs: "auto", md: "140px" }}
        gap="20px"
      >
        {/* ROW 2 */}
        <Box
          gridColumn={isMobile ? "span 1" : "span 8"}
          gridRow={isMobile ? "span 1" : "span 2"}
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Tests And Bugs Timeline
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            {monthlyStats.length > 0 ? (
              <LineChart isDashboard={true} monthlyStats={monthlyStats} />
            ) : (
              <p>Loading...</p>
            )}
          </Box>
        </Box>
        <Box
          gridColumn={isMobile ? "span 1" : "span 4"}
          gridRow={isMobile ? "span 1" : "span 2"}
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          {recentTests.length > 0 ? (
            <RecentTests tests={recentTests}></RecentTests>
          ) : (
            <p>Loading...</p>
          )}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn={isMobile ? "span 1" : "span 4"}
          gridRow={isMobile ? "span 1" : "span 2"}
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Code Coverage
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          ></Box>
          <PieChart data={typeStats[0]} title={typeStats[0].type} />
        </Box>
        <Box
          gridColumn={isMobile ? "span 1" : "span 4"}
          gridRow={isMobile ? "span 1" : "span 2"}
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Domain Chart
          </Typography>
          <Box height="250px" mt="-20px">
            {domainStats ? (
              <BarChart isDashboard={true} domainStats={domainStats} />
            ) : (
              <p>Loading...</p>
            )}
          </Box>
        </Box>
        <Box
          gridColumn={isMobile ? "span 1" : "span 4"}
          gridRow={isMobile ? "span 1" : "span 2"}
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            {geoStats ? (
              <GeographyChart isDashboard={true} geoStats={geoStats} />
            ) : (
              <p>Waiting...</p>
            )}
          </Box>
        </Box>
        {recentTests.length > 0 ? (
          recentTests
            .filter((test) => test.result === "running")
            .map((test, i) => {
              return <RunningTests test={test} index={i} isMobile={isMobile} />;
            })
        ) : (
          <p>Loading...</p>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
