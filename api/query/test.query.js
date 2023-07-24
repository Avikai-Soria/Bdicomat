const QUERY = {
  SELECT_TESTS: `
    SELECT T.*, TR1.result AS lastTestRunStatus, TR1.startTest AS lastTestRunStartTest
    FROM Tests T
    LEFT JOIN (
      SELECT testId, result, startTest
      FROM TestRuns
      WHERE id IN (
        SELECT MAX(id) AS id
        FROM TestRuns
        GROUP BY testId
      )
    ) TR1 ON T.id = TR1.testId
  `,
  SELECT_TEST: "SELECT * FROM Tests WHERE id = ?",
  CREATE_TEST:
    "INSERT INTO Tests(name, description, expectedResult, configuration) VALUES (?, ?, ?, ?)",
  UPDATE_TEST:
    "UPDATE Tests SET name = ?, description = ?, expectedResult = ?, configuration = ? WHERE id = ?",
  DELETE_TEST: "DELETE FROM Tests WHERE id = ?",
};

export default QUERY;
