import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import StatBox from "../../../QA_Dashboard/src/reusable_component/StatBox";
import { tokens } from "../hooks/theme";
import RuleIcon from "@mui/icons-material/Rule";

import { io } from 'socket.io-client';

const socket = io('http://localhost:3002');;

socket.on('connect', () => {
  console.log('Connected to the server');
});

socket.on('message', (data) => {
  console.log('Received from Server 1:', data);
});


const RunningTests = ({ tests, isMobile }) => {
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
              title={test.duration}
              subtitle={test.testName}
              progress="0.50"
              increase="50%"
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
