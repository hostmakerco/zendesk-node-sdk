const request = require('request-promise');
const walkSync = require('walk-sync');
const _ = require('lodash');

let api;

function injectApiResources(api) {
  walkSync(__dirname, {
    globs: ['**/resources/*.js'],
  }).forEach((file) => {
    require(`./${file}`)({ api }); // eslint-disable-line import/no-dynamic-require
  });
  return api;
}

module.exports = ({ zendeskSubdomain, zendeskAdminToken }) => {
  api = api || {
    request: async (path, { method = 'GET', body, queryParams } = {}) => {
      const options = {
        url: `${zendeskSubdomain}.zendesk.com/api/v2/${path}`,
        method,
        qs: queryParams,
        body,
        simple: false,
        resolveWithFullResponse: true,
        headers: {
          Authorization: `Bearer ${zendeskAdminToken}`,
          Accept: 'application/json',
        },
        json: true,
      };
      const response = await request(options);

      if (response.statusCode < 400) {
        return response.body;
      }

      const responseErrors = _.get(response, 'details.value');
      const error = new Error();
      error.zendeskApiError = response.error;
      error.responseErrors = responseErrors;
      error.message = JSON.stringify(response.body);
      error.status = response.statusCode;
      throw error;
    },
  };

  return injectApiResources(api);
};
