const QUERY = {
    SELECT_MONTHLY_STATS: `
      SELECT
        MONTH(BR.creationDate) AS month,
        SUM(CASE WHEN TR.result = 'pass' THEN 1 ELSE 0 END) AS testsPassed,
        SUM(CASE WHEN TR.result = 'fail' THEN 1 ELSE 0 END) AS testsFailed,
        SUM(CASE WHEN TR.result = 'running' THEN 1 ELSE 0 END) AS testsRunning,
        SUM(CASE WHEN BR.isExcepted = 'yes' THEN 1 ELSE 0 END) AS bugsExpected,
        SUM(CASE WHEN BR.isExcepted = 'no' THEN 1 ELSE 0 END) AS bugsUnexpected
      FROM
        BugReports BR
      LEFT JOIN
        TestRuns TR ON BR.testId = TR.testId
      GROUP BY
        MONTH(BR.creationDate);
    `,
  };
  
  export default QUERY;
  