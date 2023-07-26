const QUERY = {
    SELECT_SCHEDULED_TESTS: `
      SELECT ST.*, T.name AS testName
      FROM ScheduledTests ST
      JOIN Tests T ON ST.testId = T.id
    `,
    SELECT_SCHEDULED_TEST: `
      SELECT ST.*, T.name AS testName
      FROM ScheduledTests ST
      JOIN Tests T ON ST.testId = T.id
      WHERE ST.id = ?
    `,
    CREATE_SCHEDULED_TEST: `
      INSERT INTO ScheduledTests (testId, userId, scheduledTime)
      VALUES (?, ?, ?)
    `,
    UPDATE_SCHEDULED_TEST: `
      UPDATE ScheduledTests
      SET testId = ?, userId = ?, scheduledTime = ?
      WHERE id = ?
    `,
    DELETE_SCHEDULED_TEST: `
      DELETE FROM ScheduledTests
      WHERE id = ?
    `,
  };
  
  export default QUERY;  