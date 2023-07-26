const QUERY = {
    SELECT_TEST_RUNS: `
      SELECT TR.*, T.name AS testName, T.description AS testDescription
      FROM TestRuns TR
      LEFT JOIN Tests T ON TR.testId = T.id
    `,
    CREATE_TEST_RUN: `
      INSERT INTO TestRuns (testId, userId, result, details, duration)
      VALUES (?, ?, ?, ?, ?)
    `,
  };
  
  export default QUERY;
  