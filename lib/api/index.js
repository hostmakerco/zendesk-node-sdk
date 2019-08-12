const walkSync = require('walk-sync');
const Request = require('./request');
const Response = require('./response');
const { assertRequired } = require('../utils');
const { AUTH_TYPES, createAuthorizationHeaderValue } = require('./auth');

function assertRequiredFields(config) {
  const {
    authType = AUTH_TYPES.OAUTH_ACCESS_TOKEN, zendeskSubdomain, email, password, zendeskAdminToken,
  } = config;
  assertRequired({ zendeskSubdomain });

  switch (authType) {
    case AUTH_TYPES.BASIC_AUTH:
      return assertRequired({ email, password });
    case AUTH_TYPES.API_TOKEN:
      return assertRequired({ email, zendeskAdminToken });
    case AUTH_TYPES.OAUTH_ACCESS_TOKEN:
      return assertRequired({ zendeskAdminToken });
    case AUTH_TYPES.API_TOKEN_BASE64_ENCODED:
      return assertRequired({ zendeskAdminToken });
    default:
      throw new Error(
        `Invalid auth type authType: ${authType}, please require AUTH_TYPES and use one of ${Object.keys(AUTH_TYPES)
          .map(key => `AUTH_TYPES.${key}`)
          .join(', ')}`,
      );
  }
}

function injectApiResources(api) {
  const projectRoot = `${__dirname}/../`;
  walkSync(projectRoot, {
    globs: ['**/resources/*.js'],
    ignore: ['**/resources/*.test.js'],
  }).forEach((file) => {
    require(`${projectRoot}${file}`)({ api }); // eslint-disable-line import/no-dynamic-require
  });

  return api;
}

let api;

module.exports = (config) => {
  const { zendeskSubdomain } = config;
  assertRequiredFields(config);
  const authHeader = createAuthorizationHeaderValue(config);
  api = api || {
    request: async (path, options = {}) => {
      const uri = `https://${zendeskSubdomain}.zendesk.com/api/v2/${path}`;
      const response = await new Request(uri, { authHeader, ...options });
      return new Response(response, { authHeader });
    },
  };

  return injectApiResources(api);
};

module.exports.AUTH_TYPES = AUTH_TYPES;
