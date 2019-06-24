const { Base64 } = require('js-base64');

const AUTH_TYPES = {
  BASIC_AUTH: 'BASIC_AUTH',
  API_TOKEN: 'API_TOKEN',
  OAUTH_ACCESS_TOKEN: 'OAUTH_ACCESS_TOKEN',
};

function createAuthorizationHeaderValue(config) {
  const { authType, email, password, zendeskAdminToken, encodeEmailAndToken = true } = config;

  switch (authType) {
    case AUTH_TYPES.BASIC_AUTH:
      return `Basic ${Base64.btoa(`${email}:${password}`)}`;
    case AUTH_TYPES.API_TOKEN:
      if (encodeEmailAndToken) {
        return `Basic ${Base64.btoa(`${email}/token:${zendeskAdminToken}`)}`;
      }
      return `Basic ${zendeskAdminToken}`;
    default:
    case AUTH_TYPES.OAUTH_ACCESS_TOKEN:
      return `Bearer ${zendeskAdminToken}`;
  }
}

module.exports = { createAuthorizationHeaderValue, AUTH_TYPES };
