const QUERY = {
    SELECT_GEOGRAPHY_STATS: `
    SELECT location, COUNT(*) as count
    FROM BugReports
    GROUP BY location
  `,
  };
  
  export default QUERY;
  