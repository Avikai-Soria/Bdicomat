import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import StatBox from "../../../QA_Dashboard/src/reusable_component/StatBox";
import { tokens } from "../hooks/theme";
import RuleIcon from "@mui/icons-material/Rule";
import connectToSetUpServer from "../assets/socket/socket_client";
import { useContext, useEffect, useState } from "react";
import useWindowSize from "..//hooks/useWindowSize";

const RunningTests = ({ test, index, isMobile }) => {
  const [progress, setProgress] = useState([0]);
  if (progress == 0) {
    console.log("connecting to socket");
    connectToSetUpServer(`${parseInt(test.id, 10) + 3000}`, setProgress);
  }
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <>
      {
        <Box
          key={`${test.id}-${index}`}
          gridColumn={isMobile ? "span 1" : "span 3"}
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            key={`${test.id}-${index}`}
            title={`test id: ${test.id}`}
            subtitle={test.testName}
            progress={progress}
            increase={`%${(progress * 100).toFixed(2)}`}
            icon={
              <RuleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
      }
    </>
  );
};

export default RunningTests;
