import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import StatBox from "../../../QA_Dashboard/src/reusable_component/StatBox";
import { tokens } from "../hooks/theme";
import RuleIcon from "@mui/icons-material/Rule";
import connectToSetUpServer from "../assets/socket/socket_client";
import { useContext, useEffect, useState } from "react";

const RunningTests = ({ tests, isMobile }) => {
  const [progress, setProgress] = useState([0]);
  if (progress == 0) {
    console.log("connecting to socket");
    connectToSetUpServer("3002", setProgress);
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      {tests
        .filter((test) => test.result === "running")
        .map((test, i) => (
          <Box
            key={`${test.id}-${i}`}
            gridColumn={isMobile ? "span 1" : "span 3"}
            backgroundColor={colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <StatBox
              title={`test id: ${test.id}`}
              subtitle={test.testName}
              progress={progress}
              increase={`%${progress * 100}`}
              icon={
                <RuleIcon
                  sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
                />
              }
            />
          </Box>
        ))}
    </>
  );
};

export default RunningTests;
