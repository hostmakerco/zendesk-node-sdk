const nock = require('nock');
const Api = require('./index');

describe('API', () => {
  test('should initialise with defined resources', () => {
    const supportedResources = ['tickets'];

    const zendeskApi = Api({
      zendeskSubdomain: 'my-subdomain',
      zendeskAdminToken: 'XXXXX',
    });

    supportedResources.forEach((resource) => {
      expect(zendeskApi[resource]).toBeDefined();
    });
  });

  test('should throw an error if initialised without a subdomain', () => {
    expect(() => {
      Api({
        zendeskAdminToken: 'XXXXX',
      });
    }).toThrow('zendeskSubdomain is a required argument.');
  });

  test('should throw an error if initialised without an adminToken', () => {
    expect(() => {
      Api({
        zendeskSubdomain: 'my-subdomain',
      });
    }).toThrow('zendeskAdminToken is a required argument.');
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
