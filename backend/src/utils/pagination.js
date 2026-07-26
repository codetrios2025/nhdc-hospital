module.exports = (page = 1, limit = 10) => {
  page = parseInt(page);

  limit = parseInt(limit);

  return {
    page,

    limit,

    skip: (page - 1) * limit,
  };
};
