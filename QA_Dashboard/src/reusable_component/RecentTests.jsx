import React from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../hooks/theme";

const RecentTests = ({ tests: tests }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom={`4px solid ${colors.primary[500]}`} colors={colors.grey[100]} p="15px">
        <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
          Recent Tests
        </Typography>
      </Box>
      {tests.map((test, i) => (
        <Box key={`${test.id}-${i}`} display="flex" justifyContent="space-between" alignItems="center" borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
          <Box>
            <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
              {test.id}
            </Typography>
            <Typography color={colors.grey[100]}>
              {test.testName}
            </Typography>
          </Box>
          <Box color={colors.grey[100]}>{formatDateTime(test.startTest)}</Box>
          <Box
            backgroundColor={
              test.result === "pass"
                ? colors.greenAccent[500]
                : test.result === "fail"
                  ? "red" 
                  : "blue"
            }
            p="5px 10px"
            borderRadius="4px"
          >
            {test.result}
          </Box>
        </Box>
      ))}
    </>
  );
};

const formatDateTime = (dateTimeString) => {
  const dateTime = new Date(dateTimeString);
  const formattedDate = dateTime.toISOString().replace("T", " ").slice(0, 19);
  return formattedDate;
};

export default RecentTests;
