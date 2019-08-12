const { Base64 } = require('js-base64');
const { AUTH_TYPES, createAuthorizationHeaderValue } = require('./auth');

describe(createAuthorizationHeaderValue.name, () => {
  test('should create the right base64 encoded header value for email/password auth', () => {
    const authorizationHeaderValue = createAuthorizationHeaderValue({
      authType: AUTH_TYPES.BASIC_AUTH,
      email: 'test@example.com',
      password: 'pa$$word',
    });
    expect(Base64.decode(authorizationHeaderValue.replace('Basic ', ''))).toBe('test@example.com:pa$$word');
    expect(authorizationHeaderValue).toBe('Basic dGVzdEBleGFtcGxlLmNvbTpwYSQkd29yZA==');
  });
  test('should create the right base64 encoded header value for api token auth', () => {
    const authorizationHeaderValue = createAuthorizationHeaderValue({
      authType: AUTH_TYPES.API_TOKEN,
      email: 'email@example.com',
      zendeskAdminToken: 'XXXXX',
    });
    expect(Base64.decode(authorizationHeaderValue.replace('Basic ', ''))).toBe('email@example.com/token:XXXXX');
    expect(authorizationHeaderValue).toBe('Basic ZW1haWxAZXhhbXBsZS5jb20vdG9rZW46WFhYWFg=');
  });
  test('should create the right header value for oauth', () => {
    expect(
      createAuthorizationHeaderValue({
        authType: AUTH_TYPES.OAUTH_ACCESS_TOKEN,
        zendeskAdminToken: 'XXXXX',
      }),
    ).toBe('Bearer XXXXX');
  });
  test('should create a header for oauth if not specified otherwise', () => {
    expect(
      createAuthorizationHeaderValue({
        zendeskAdminToken: 'XXXXX',
      }),
    ).toBe('Bearer XXXXX');
  });
});
