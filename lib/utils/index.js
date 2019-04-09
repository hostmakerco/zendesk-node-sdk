const walkSync = require('walk-sync');

function assertRequired(params) {
  Object.keys(params).forEach((key) => {
    if (params[key] === undefined) {
      throw new Error(`${key} is required`);
    }
  });
}

function injectApiResources(api) {
  walkSync(__dirname, {
    globs: ['**/resources/*.js'],
  }).forEach((file) => {
    require(`./${file}`)({ api });
  });
  return api;
}

module.exports = {
  assertRequired,
  injectApiResources,
};
