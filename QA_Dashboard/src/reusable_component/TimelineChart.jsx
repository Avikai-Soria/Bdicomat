import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../hooks/theme";
import { UserInfoContext } from "../components/main_page/MainPageContainer";
import apiFetch from "../hooks/api";
import { useContext, useEffect, useState } from "react";

const LineChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const { userId, apiKey } = useContext(UserInfoContext);
  const [monthlyStats, setMonthlyStats] = useState([]);

  useEffect(() => {
    apiFetch(`monthlystat`, "GET", apiKey)
      .then((response) => setMonthlyStats(response.data.monthlyStats))
      .catch((err) =>
        alert("Couldn't load monthly Stats... Please refresh the page")
      );
      console.log(monthlyStats);
  }, []);
  

  const LineData = [
    {
      id: "Running tests",
      color: tokens("dark").greenAccent[500],
      data: [
        {
          x: "Jan.",
          y: monthlyStats[0].testsRunning,
        },
        {
          x: "Feb.",
          y: monthlyStats[1].testsRunning,
        },
        {
          x: "Mar.",
          y: monthlyStats[2].testsRunning,
        },
        {
          x: "Apr.",
          y: monthlyStats[3].testsRunning,
        },
        {
          x: "May",
          y: monthlyStats[4].testsRunning,
        },
        {
          x: "Jun.",
          y: monthlyStats[5].testsRunning,
        },
        {
          x: "Jul.",
          y: monthlyStats[6].testsRunning,
        },
        {
          x: "Aug.",
          y: monthlyStats[7].testsRunning,
        },
        {
          x: "Sept.",
          y: monthlyStats[8].testsRunning,
        },
        {
          x: "Oct.",
          y: monthlyStats[9].testsRunning,
        },
        {
          x: "Nov.",
          y: monthlyStats[10].testsRunning,
        },
        {
          x: "Dec.",
          y: monthlyStats[11].testsRunning,
        },
      ],
    },
    {
      id: "failed tests",
      color: tokens("dark").blueAccent[300],
      data: [
        {
          x: "Jan.",
          y: monthlyStats[0].testsFailed,
        },
        {
          x: "Feb.",
          y: monthlyStats[1].testsFailed,
        },
        {
          x: "Mar.",
          y: monthlyStats[2].testsFailed,
        },
        {
          x: "Apr.",
          y: monthlyStats[3].testsFailed,
        },
        {
          x: "May",
          y: monthlyStats[4].testsFailed,
        },
        {
          x: "Jun.",
          y: monthlyStats[5].testsFailed,
        },
        {
          x: "Jul.",
          y: monthlyStats[6].testsFailed,
        },
        {
          x: "Aug.",
          y: monthlyStats[7].testsFailed,
        },
        {
          x: "Sept.",
          y: monthlyStats[8].testsFailed,
        },
        {
          x: "Oct.",
          y: monthlyStats[9].testsFailed,
        },
        {
          x: "Nov.",
          y: monthlyStats[10].testsFailed,
        },
        {
          x: "Dec.",
          y: monthlyStats[11].testsFailed,
        },
      ],
    },
    {
      id: "pass tests",
      color: tokens("dark").redAccent[200],
      data: [
        {
          x: "Jan.",
          y: monthlyStats[0].testsPassed,
        },
        {
          x: "Feb.",
          y: monthlyStats[1].testsPassed,
        },
        {
          x: "Mar.",
          y: monthlyStats[2].testsPassed,
        },
        {
          x: "Apr.",
          y: monthlyStats[3].testsPassed,
        },
        {
          x: "May",
          y: monthlyStats[4].testsPassed,
        },
        {
          x: "Jun.",
          y: monthlyStats[5].testsPassed,
        },
        {
          x: "Jul.",
          y: monthlyStats[6].testsPassed,
        },
        {
          x: "Aug.",
          y: monthlyStats[7].testsPassed,
        },
        {
          x: "Sept.",
          y: monthlyStats[8].testsPassed,
        },
        {
          x: "Oct.",
          y: monthlyStats[9].testsPassed,
        },
        {
          x: "Nov.",
          y: monthlyStats[10].testsPassed,
        },
        {
          x: "Dec.",
          y: monthlyStats[11].testsPassed,
        },
      ],
    },
    {
      id: "excepted bugs",
      color: tokens("dark").redAccent[200],
      data: [
        {
          x: "Jan.",
          y: monthlyStats[0].bugsExpected,
        },
        {
          x: "Feb.",
          y: monthlyStats[1].bugsExpected,
        },
        {
          x: "Mar.",
          y: monthlyStats[2].bugsExpected,
        },
        {
          x: "Apr.",
          y: monthlyStats[3].bugsExpected,
        },
        {
          x: "May",
          y: monthlyStats[4].bugsExpected,
        },
        {
          x: "Jun.",
          y: monthlyStats[5].bugsExpected,
        },
        {
          x: "Jul.",
          y: monthlyStats[6].bugsExpected,
        },
        {
          x: "Aug.",
          y: monthlyStats[7].bugsExpected,
        },
        {
          x: "Sept.",
          y: monthlyStats[8].bugsExpected,
        },
        {
          x: "Oct.",
          y: monthlyStats[9].bugsExpected,
        },
        {
          x: "Nov.",
          y: monthlyStats[10].bugsExpected,
        },
        {
          x: "Dec.",
          y: monthlyStats[11].bugsExpected,
        },
      ],
    },
    {
      id: "Not excepted bugs",
      color: tokens("dark").redAccent[200],
      data: [
        {
          x: "Jan.",
          y: monthlyStats[0].bugsUnexpected,
        },
        {
          x: "Feb.",
          y: monthlyStats[1].bugsUnexpected,
        },
        {
          x: "Mar.",
          y: monthlyStats[2].bugsUnexpected,
        },
        {
          x: "Apr.",
          y: monthlyStats[3].bugsUnexpected,
        },
        {
          x: "May",
          y: monthlyStats[4].bugsUnexpected,
        },
        {
          x: "Jun.",
          y: monthlyStats[5].bugsUnexpected,
        },
        {
          x: "Jul.",
          y: monthlyStats[6].bugsUnexpected,
        },
        {
          x: "Aug.",
          y: monthlyStats[7].bugsUnexpected,
        },
        {
          x: "Sept.",
          y: monthlyStats[8].bugsUnexpected,
        },
        {
          x: "Oct.",
          y: monthlyStats[9].bugsUnexpected,
        },
        {
          x: "Nov.",
          y: monthlyStats[10].bugsUnexpected,
        },
        {
          x: "Dec.",
          y: monthlyStats[11].bugsUnexpected,
        },
      ],
    },
  ];

  return (
    <ResponsiveLine
      data={LineData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[500],
          },
        },
      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 0,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "transportation", // added
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "count", // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={8}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;
