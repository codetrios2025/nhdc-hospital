const queryParams = (params = {}) => {
  const searchParams = new URLSearchParams();

  Object.keys(params).forEach((key) => {
    if (
      params[key] !== undefined &&
      params[key] !== null &&
      params[key] !== ""
    ) {
      searchParams.append(
        key,

        params[key],
      );
    }
  });

  return searchParams.toString();
};

export default queryParams;
