const QUERY = {
  SELECT_USERS: `
  SELECT U.*, UR.role AS userRole
  FROM Users U
  LEFT JOIN UserRoles UR ON U.id = UR.userId
`,
  SELECT_USER_BY_ID: `
  SELECT U.*, UR.role AS userRole
  FROM Users U
  LEFT JOIN UserRoles UR ON U.id = UR.userId
  WHERE U.id = ?
`,
  SELECT_USER_BY_USERNAME: "SELECT * FROM Users WHERE username = ?",
  SELECT_USER_BY_USERNAME_OR_EMAIL:
    "SELECT * FROM Users WHERE username = ? OR email = ?",
  CREATE_USER:
    "INSERT INTO Users(name, username, email, address) VALUES (?, ?, ?, ?)",
  UPDATE_USER:
    "UPDATE Users SET name = ?, username = ?, email = ?, address = ? WHERE id = ?",
  DELETE_USER: "DELETE FROM Users WHERE id = ?",
  CREATE_PASSWORD: "INSERT INTO Passwords(userId, password) VALUES (?, ?)",
  ADD_USER_ROLE: `
  INSERT INTO UserRoles (userId, role)
  VALUES (?, ?)`,
  UPDATE_PASSWORD:
    "UPDATE Passwords SET password = ? WHERE userId = ? AND password = ?",
  DELETE_PASSWORD: "DELETE FROM Passwords WHERE userId = ?",
  DELETE_APIKEYS: "DELETE FROM ApiKeys WHERE userId = ?",
  UPGRADE_USER_TO_ADMIN: `
  UPDATE UserRoles SET role = 'admin' WHERE userId = ? AND role = 'tester'`,
};

export default QUERY;
