const QUERY = {
    SELECT_TYPE_STATS: `
      SELECT
          T.type,
          COUNT(CASE WHEN TR.result = 'pass' THEN 1 END) AS pass_count,
          COUNT(CASE WHEN TR.result = 'fail' THEN 1 END) AS fail_count,
          COUNT(CASE WHEN TR.result = 'running' THEN 1 END) AS running_count
      FROM
          TestRuns TR
      JOIN
          Tests T ON TR.testId = T.id
      GROUP BY
          T.type;
    `
  };
  
  export default QUERY;
  