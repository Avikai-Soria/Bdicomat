const QUERY = {
  SELECT_DOMAIN_STATS: `
    SELECT
      domain,
      SUM(CASE WHEN result = 'pass' THEN 1 ELSE 0 END) AS testsPassed,
      SUM(CASE WHEN result = 'fail' THEN 1 ELSE 0 END) AS testsFailed,
      SUM(CASE WHEN result = 'running' THEN 1 ELSE 0 END) AS testsRunning,
      SUM(CASE WHEN isExcepted = 'yes' THEN 1 ELSE 0 END) AS bugsExpected,
      SUM(CASE WHEN isExcepted = 'no' THEN 1 ELSE 0 END) AS bugsUnexpected
    FROM
    TestRuns TR
    LEFT JOIN
      BugReports BR ON TR.testId = BR.testId
    GROUP BY
      domain;
  `,
};

export default QUERY;
