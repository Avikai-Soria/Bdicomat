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
        <Box key={`${test.txId}-${i}`} display="flex" justifyContent="space-between" alignItems="center" borderBottom={`4px solid ${colors.primary[500]}`} p="15px">
          <Box>
            <Typography color={colors.greenAccent[500]} variant="h5" fontWeight="600">
              {test.txId}
            </Typography>
            <Typography color={colors.grey[100]}>
              {test.user}
            </Typography>
          </Box>
          <Box color={colors.grey[100]}>{test.date}</Box>
          <Box backgroundColor={colors.greenAccent[500]} p="5px 10px" borderRadius="4px">
            ${test.cost}
          </Box>
        </Box>
      ))}
    </>
  );
};

export default RecentTests;
