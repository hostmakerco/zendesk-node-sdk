const request = require('request-promise');
const _ = require('lodash');
const { assertRequired, injectApiResources } = require('./utils');

let api;

module.exports = ({ zendeskSubdomain, zendeskAdminToken }) => {
  assertRequired({ zendeskSubdomain, zendeskAdminToken });

  api = api || {
    request: async (path, { method = 'GET', body, queryParams } = {}) => {
      const options = {
        url: `https://${zendeskSubdomain}.zendesk.com/api/v2/${path}`,
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

      // TODO error handling
      const error = new Error();
      throw error;
    },
    __nextPage: () => {
      // TODO: function that curries response into next page getter
    },
  };

  return injectApiResources(api);
};
