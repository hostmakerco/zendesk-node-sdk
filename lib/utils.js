function assertRequired(params) {
  Object.keys(params).forEach((key) => {
    if (params[key] === undefined) {
      throw new Error(`${key} is required`);
    }
  });
}

module.exports = {
  assertRequired,
};
