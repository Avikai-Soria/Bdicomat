const QUERY = {
    SELECT_BUGS: `
      SELECT BR.*, U.name AS userName
      FROM BugReports BR
      LEFT JOIN Users U ON BR.userId = U.id
    `,
    SELECT_BUG: "SELECT * FROM BugReports WHERE id = ?",
    CREATE_BUG: `
      INSERT INTO BugReports(testId, userId, bugDescription, location, version, domain, status, isExcepted)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
    UPDATE_BUG: `
      UPDATE BugReports
      SET testId = ?, userId = ?, bugDescription = ?, location = ?, version = ?, domain = ?, status = ?, isExcepted = ?
      WHERE id = ?
    `,
    DELETE_BUG: "DELETE FROM BugReports WHERE id = ?",
  };
  
  export default QUERY;
  