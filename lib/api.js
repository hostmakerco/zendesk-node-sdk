const walkSync = require('walk-sync');
const Request = require('./Request');
const Response = require('./Response');
const { assertRequired } = require('./utils');

function injectApiResources(api) {
  walkSync(__dirname, {
    globs: ['**/resources/*.js'],
  }).forEach((file) => {
    require(`./${file}`)({ api }); // eslint-disable-line import/no-dynamic-require
  });

  return api;
}

let api;

module.exports = ({ zendeskSubdomain, zendeskAdminToken }) => {
  assertRequired({ zendeskSubdomain, zendeskAdminToken });
  api = api || {
    request: async (path, { method = 'GET', body, queryParams }) => {
      const uri = `https://${zendeskSubdomain}.zendesk.com/api/v2/${path}`;
      const response = await new Request(uri, {
        method,
        body,
        queryParams,
        auth: { zendeskSubdomain, zendeskAdminToken },
      });

      return new Response(response, { auth: { zendeskSubdomain, zendeskAdminToken } });
    },
  };

  return injectApiResources(api);
};
