const generateQuery = (baseQuery, conditions = [], limit, page, orderBy = null) => {
  let query = baseQuery;

  if (conditions.length > 0) {
    query += ` WHERE ${conditions.join(" AND ")}`;
  }

  if (orderBy) {
    query += ` ORDER BY ${orderBy}`;
  }

  if (limit) {
    query += ` LIMIT ${limit}`;
  }

  if (page && limit) {
    query += ` OFFSET ${(page - 1) * limit}`;
  }

  return query;
};

export default generateQuery;
