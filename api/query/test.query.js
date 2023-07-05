const QUERY = {
  SELECT_TESTS: "SELECT * FROM Tests",
  SELECT_TEST: "SELECT * FROM Tests WHERE id = ?",
  CREATE_TEST:
    "INSERT INTO Tests(name, description, expectedResult, configuration) VALUES (?, ?, ?, ?)",
  UPDATE_TEST:
    "UPDATE Tests SET name = ?, description = ?, expectedResult = ?, configuration = ? WHERE id = ?",
  DELETE_TEST: "DELETE FROM Tests WHERE id = ?",
};

export default QUERY;
