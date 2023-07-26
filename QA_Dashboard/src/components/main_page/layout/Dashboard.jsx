import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../hooks/theme";
import { mockTransactions } from "../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../../reusable_component/Header.jsx";
import LineChart from "../../../reusable_component/TimelineChart";
import GeographyChart from "../../../reusable_component/GeographyChart";
import BarChart from "../../../reusable_component/DomainChart.jsx";
import StatBox from "../../../reusable_component/StatBox";
import ProgressCircle from "../../../reusable_component/ProgressCircle";
import RecentTests from "../../../reusable_component/RecentTests";
import { useContext, useEffect, useState } from "react";
import { UserInfoContext } from "../MainPageContainer";
import apiFetch from "../../../hooks/api";


const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { userId, apiKey } = useContext(UserInfoContext);
  const [domainStats, setDomainStats] = useState([]);
  const [monthlyStats, setMonthlyStats] = useState([]);
  const [geoStats, setGeoStats] = useState([]);
  const [recentTests, setRecentTests] = useState([]);


  useEffect(() => {
    apiFetch(`domainstat`, "GET", apiKey)
      .then((response) => setDomainStats(response.data.domainStats))
      .catch((err) => console.log("Couldn't load domain's stats..."));
  }, []);

  useEffect(() => {
    apiFetch(`monthlystat`, "GET", apiKey)
      .then((response) => setMonthlyStats(response.data.monthlyStats))
      .catch((err) =>
        console.log("Couldn't load monthly Stats...")
      );
  }, []);

  useEffect(() => {
    apiFetch(`geographicstat`, "GET", apiKey)
      .then((response) => setGeoStats(response.data.geographicStats))
      .catch((err) => console.log("Couldn't load geographic's stats..."));
  }, []);

  useEffect(() => {
    apiFetch(`testruns?limit=10`, "GET", apiKey)
      .then((response) => setRecentTests(response.data.testRuns))
      .catch((err) => console.log("Couldn't load recent tests..."));
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
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="12,361"
            subtitle="Emails Sent"
            progress="0.75"
            increase="+14%"
            icon={
              <EmailIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
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
          gridColumn="span 4"
          gridRow="span 2"
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
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
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
            {domainStats ? <BarChart isDashboard={true} domainStats={domainStats} /> : <p>Loading...</p>}
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
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
            {geoStats ? <GeographyChart isDashboard={true} geoStats={geoStats} /> : <p>Waiting...</p>}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
