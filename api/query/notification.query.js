const QUERY = {
    SELECT_NOTIFICATIONS_BY_USER_ID: `
    SELECT *
    FROM UserNotifications
    WHERE userID = ?
    `,
  };
  
  export default QUERY;
  