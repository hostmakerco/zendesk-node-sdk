const request = require('request-promise');
const walkSync = require('walk-sync');
const { logger } = require('../../utility/loggers');
const _ = require('lodash');

let api;

function injectApiResources(api) {
  walkSync(__dirname, {
    globs: ['**/resources/zendesk_*.js'],
  }).forEach((file) => {
    require(`./${file}`)({ api });  // eslint-disable-line import/no-dynamic-require
  });
  return api;
}

module.exports = ({ config }) => {
  const { ZENDESK_ADMIN_TOKEN, ZENDESK_API_BASE_URL } = config;

  api = api || {
    request: async (path, { method = 'GET', body, queryParams } = {}) => {
      const options = {
        url: `${ZENDESK_API_BASE_URL}${path}`,
        method,
        qs: queryParams,
        body,
        simple: false,
        resolveWithFullResponse: true,
        headers: {
          Authorization: `Bearer ${ZENDESK_ADMIN_TOKEN}`,
          Accept: 'application/json',
        },
        json: true,
      };
      const response = await request(options);

      if (response.statusCode < 400) {
        return response.body;
      }

      logger.error({ errorPath: path, payload: { statusCode: response.statusCode, error: response.body } });
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