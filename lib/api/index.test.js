const nock = require('nock');
const Api = require('./index');
const { AUTH_TYPES } = require('./auth');

describe('API', () => {
  describe('when auth method is via basic auth', () => {
    test('should initialise with defined resources', () => {
      const supportedResources = ['tickets', 'users'];

      const zendeskApi = Api({
        authType: AUTH_TYPES.BASIC_AUTH,
        zendeskSubdomain: 'my-subdomain',
        email: 'email@example.com',
        password: 'pa$$word',
      });

      supportedResources.forEach((resource) => {
        expect(zendeskApi[resource]).toBeDefined();
      });
    });

    test('should throw an error if initialised without a subdomain', () => {
      expect(() => {
        Api({
          authType: AUTH_TYPES.BASIC_AUTH,
          email: 'email@example.com',
          password: 'pa$$word',
        });
      }).toThrow('zendeskSubdomain is a required argument.');
    });

    test('should throw an error if initialised without an email', () => {
      expect(() => {
        Api({
          authType: AUTH_TYPES.BASIC_AUTH,
          zendeskSubdomain: 'my-subdomain',
          password: 'pa$$word',
        });
      }).toThrow('email is a required argument.');
    });

    test('should throw an error if initialised without a password', () => {
      expect(() => {
        Api({
          authType: AUTH_TYPES.BASIC_AUTH,
          zendeskSubdomain: 'my-subdomain',
          email: 'email@example.com',
        });
      }).toThrow('password is a required argument.');
    });
  });

  describe('when auth method is via api token', () => {
    test('should initialise with defined resources', () => {
      const supportedResources = ['tickets', 'users'];

      const zendeskApi = Api({
        authType: AUTH_TYPES.API_TOKEN,
        zendeskSubdomain: 'my-subdomain',
        email: 'email@example.com',
        zendeskAdminToken: 'XXXXX',
      });

      supportedResources.forEach((resource) => {
        expect(zendeskApi[resource]).toBeDefined();
      });
    });

    test('should throw an error if initialised without a subdomain', () => {
      expect(() => {
        Api({
          authType: AUTH_TYPES.API_TOKEN,
          email: 'email@example.com',
          zendeskAdminToken: 'XXXXX',
        });
      }).toThrow('zendeskSubdomain is a required argument.');
    });

    test('should throw an error if initialised without an email address', () => {
      expect(() => {
        Api({
          authType: AUTH_TYPES.API_TOKEN,
          zendeskSubdomain: 'my-subdomain',
          zendeskAdminToken: 'XXXXX',
        });
      }).toThrow('email is a required argument.');
    });

    test('should throw an error if initialised without an adminToken', () => {
      expect(() => {
        Api({
          authType: AUTH_TYPES.API_TOKEN,
          zendeskSubdomain: 'my-subdomain',
          email: 'email@example.com',
        });
      }).toThrow('zendeskAdminToken is a required argument.');
    });
  });

  describe('when auth method is via oauth (default)', () => {
    test('should initialise with defined resources', () => {
      const supportedResources = ['tickets', 'users'];

      const zendeskApiExplicitOauth = Api({
        zendeskSubdomain: 'my-subdomain',
        zendeskAdminToken: 'XXXXX',
        authType: AUTH_TYPES.OAUTH_ACCESS_TOKEN,
      });

      supportedResources.forEach((resource) => {
        expect(zendeskApiExplicitOauth[resource]).toBeDefined();
      });

      const zendeskApiImplicitOauth = Api({
        zendeskSubdomain: 'my-subdomain',
        zendeskAdminToken: 'XXXXX',
      });

      supportedResources.forEach((resource) => {
        expect(zendeskApiImplicitOauth[resource]).toBeDefined();
      });
    });

    test('should throw an error if initialised without a subdomain', () => {
      expect(() => {
        Api({
          zendeskAdminToken: 'XXXXX',
          authType: AUTH_TYPES.OAUTH_ACCESS_TOKEN,
        });
      }).toThrow('zendeskSubdomain is a required argument.');
    });

    test('should throw an error if initialised without an adminToken', () => {
      expect(() => {
        Api({
          zendeskSubdomain: 'my-subdomain',
          authType: AUTH_TYPES.OAUTH_ACCESS_TOKEN,
        });
      }).toThrow('zendeskAdminToken is a required argument.');
    });
  });

  describe('when auth method is via base64 encoded token with email', () => {
    test('should throw an error if initialised without an adminToken', () => {
      expect(() => {
        Api({
          zendeskSubdomain: 'my-subdomain',
          authType: AUTH_TYPES.API_TOKEN_BASE64_ENCODED,
        });
      }).toThrow('zendeskAdminToken is a required argument.');
    });
  });

  describe('when auth method is via invalid', () => {
    test('should initialise with defined resources', () => {
      expect(() => {
        Api({
          zendeskSubdomain: 'my-subdomain',
          zendeskAdminToken: 'XXXXX',
          authType: 'INVALID_AUTH_TYPE',
        });
      }).toThrow(
        'Invalid auth type authType: INVALID_AUTH_TYPE, please require AUTH_TYPES and use one of AUTH_TYPES.BASIC_AUTH, AUTH_TYPES.API_TOKEN, AUTH_TYPES.OAUTH_ACCESS_TOKEN',
      );
    });
  });
});

describe('Api.request', () => {
  const zendeskSubdomain = 'my-subdomain';
  const baseUrl = `https://${zendeskSubdomain}.zendesk.com/api/v2`;
  const defaultQueryParams = {
    sort_by: 'created_at',
    sort_order: 'desc',
  };

  test('should return a Response object given a 200 request', async () => {
    nock(baseUrl, { reqheaders: {} })
      .get('/example')
      .query(defaultQueryParams)
      .reply(200, {
        some_data: 'abcdefghi',
      });

    const zendeskApi = Api({
      zendeskSubdomain: 'my-subdomain',
      zendeskAdminToken: 'XXXXX',
    });

    const response = await zendeskApi.request('example');

    expect(response).toEqual({
      body: {
        someData: 'abcdefghi',
      },
      headers: {
        'content-type': 'application/json',
      },
      statusCode: 200,
    });
  });

  test('should return a ZendeskRequestError when statusCode > 299', async () => {
    nock(baseUrl, { reqheaders: {} })
      .get('/example')
      .query(defaultQueryParams)
      .reply(404);

    const zendeskApi = Api({
      zendeskSubdomain: 'my-subdomain',
      zendeskAdminToken: 'XXXXX',
    });

    try {
      await zendeskApi.request('example');
    } catch (e) {
      expect(e.constructor.name).toEqual('ZendeskRequestError');
    }
  });

  test('should return a ZendeskRequestError when statusCode < 200', async () => {
    nock(baseUrl, { reqheaders: {} })
      .get('/example')
      .query(defaultQueryParams)
      .reply(1);

    const zendeskApi = Api({
      zendeskSubdomain: 'my-subdomain',
      zendeskAdminToken: 'XXXXX',
    });

    try {
      await zendeskApi.request('example');
    } catch (e) {
      expect(e.constructor.name).toEqual('ZendeskRequestError');
    }
  });

  test('should return a nextPageGetter function when nextPage in response', async () => {
    nock(baseUrl, { reqheaders: {} })
      .get('/example')
      .query(defaultQueryParams)
      .reply(200, {
        some_data: 'abcdefghi',
        next_page: 'https://some_url.com/?pageNumber=1',
      });

    const zendeskApi = Api({
      zendeskSubdomain: 'my-subdomain',
      zendeskAdminToken: 'XXXXX',
    });

    const response = await zendeskApi.request('example');

    expect(response.body).toEqual({
      someData: 'abcdefghi',
      nextPage: 'https://some_url.com/?pageNumber=1',
    });
    expect(response.getNextPage).toBeInstanceOf(Function);
  });

  test('should return a previousPageGetter function when previousPage in response', async () => {
    nock(baseUrl, { reqheaders: {} })
      .get('/example')
      .query(defaultQueryParams)
      .reply(200, {
        some_data: 'abcdefghi',
        previous_page: 'https://some_url.com/?pageNumber=4',
      });

    const zendeskApi = Api({
      zendeskSubdomain: 'my-subdomain',
      zendeskAdminToken: 'XXXXX',
    });

    const response = await zendeskApi.request('example');

    expect(response.body).toEqual({
      someData: 'abcdefghi',
      previousPage: 'https://some_url.com/?pageNumber=4',
    });
    expect(response.getPreviousPage).toBeInstanceOf(Function);
  });
});
