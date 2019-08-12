const { Base64 } = require('js-base64');

const AUTH_TYPES = {
  BASIC_AUTH: 'BASIC_AUTH',
  API_TOKEN: 'API_TOKEN',
  OAUTH_ACCESS_TOKEN: 'OAUTH_ACCESS_TOKEN',
  API_TOKEN_BASE64_ENCODED: 'API_TOKEN_BASE64_ENCODED',
};

function createAuthorizationHeaderValue(config) {
  const {
    authType, email, password, zendeskAdminToken,
  } = config;

  switch (authType) {
    case AUTH_TYPES.BASIC_AUTH:
      return `Basic ${Base64.btoa(`${email}:${password}`)}`;
    case AUTH_TYPES.API_TOKEN:
      return `Basic ${Base64.btoa(`${email}/token:${zendeskAdminToken}`)}`;
    case AUTH_TYPES.API_TOKEN_BASE64_ENCODED:
      return `Basic ${zendeskAdminToken}`;
    default:
    case AUTH_TYPES.OAUTH_ACCESS_TOKEN:
      return `Bearer ${zendeskAdminToken}`;
  }
}

module.exports = { createAuthorizationHeaderValue, AUTH_TYPES };
