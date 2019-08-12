const request = require('request-promise');
const Request = require('./request');

jest.mock('request-promise');

describe('Request', () => {
  afterEach(() => {
    request.mockReset();
  });

  test('should serialise query parameters to snake_case', async () => {
    request.mockImplementationOnce(() => Promise.resolve({}));

    await new Request('https://example.com', {
      method: 'GET',
      authHeader: 'abcdefg',
      queryParams: { camelCase: 'x', anotherOne: 'y' },
    });

    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith({
      uri: 'https://example.com',
      method: 'GET',
      body: undefined,
      qs: {
        sort_by: 'created_at', sort_order: 'desc', camel_case: 'x', another_one: 'y',
      },
      simple: false,
      resolveWithFullResponse: true,
      headers: {
        Authorization: 'abcdefg',
        Accept: 'application/json',
      },
      json: true,
    });
  });

  test('should convert array based query parameters to comma separated lists', async () => {
    request.mockImplementationOnce(() => Promise.resolve({}));

    await new Request('https://example.com', {
      method: 'GET',
      authHeader: 'abcdefg',
      queryParams: { listData: ['x', 'y', 'z'] },
    });

    expect(request).toHaveBeenCalledWith({
      uri: 'https://example.com',
      method: 'GET',
      body: undefined,
      qs: { sort_by: 'created_at', sort_order: 'desc', list_data: 'x,y,z' },
      simple: false,
      resolveWithFullResponse: true,
      headers: {
        Authorization: 'abcdefg',
        Accept: 'application/json',
      },
      json: true,
    });
  });

  test('should include sortBy and sortOrder by default for GET requests', async () => {
    request.mockImplementationOnce(() => Promise.resolve({}));

    await new Request('https://example.com', {
      method: 'GET',
      authHeader: 'abcdefg',
      queryParams: {},
    });

    expect(request).toHaveBeenCalledWith({
      uri: 'https://example.com',
      method: 'GET',
      body: undefined,
      qs: { sort_by: 'created_at', sort_order: 'desc' },
      simple: false,
      resolveWithFullResponse: true,
      headers: {
        Authorization: 'abcdefg',
        Accept: 'application/json',
      },
      json: true,
    });
  });

  test('should allow sortBy to be specified manually', async () => {
    request.mockImplementationOnce(() => Promise.resolve({}));

    await new Request('https://example.com', {
      method: 'GET',
      authHeader: 'abcdefg',
      queryParams: { sortBy: 'updated_at', sortOrder: 'asc' },
    });

    expect(request).toHaveBeenCalledWith({
      uri: 'https://example.com',
      method: 'GET',
      body: undefined,
      qs: { sort_by: 'updated_at', sort_order: 'asc' },
      simple: false,
      resolveWithFullResponse: true,
      headers: {
        Authorization: 'abcdefg',
        Accept: 'application/json',
      },
      json: true,
    });
  });

  test('should serialise POST body to snake_case', async () => {
    request.mockImplementationOnce(() => Promise.resolve({}));

    await new Request('https://example.com', {
      method: 'POST',
      authHeader: 'abcdefg',
      body: { id: 1, name: 'A name' },
    });

    expect(request).toHaveBeenCalledWith({
      uri: 'https://example.com',
      method: 'POST',
      body: { id: 1, name: 'A name' },
      qs: {},
      simple: false,
      resolveWithFullResponse: true,
      headers: {
        Authorization: 'abcdefg',
        Accept: 'application/json',
      },
      json: true,
    });
  });

  test('should serialise PUT body to snake_case', async () => {
    request.mockImplementationOnce(() => Promise.resolve({}));

    await new Request('https://example.com', {
      method: 'PUT',
      authHeader: 'abcdefg',
      body: { id: 1, name: 'A name' },
    });

    expect(request).toHaveBeenCalledWith({
      uri: 'https://example.com',
      method: 'PUT',
      body: { id: 1, name: 'A name' },
      qs: {},
      simple: false,
      resolveWithFullResponse: true,
      headers: {
        Authorization: 'abcdefg',
        Accept: 'application/json',
      },
      json: true,
    });
  });

  test('should serialise PATCH body to snake_case', async () => {
    request.mockImplementationOnce(() => Promise.resolve({}));

    await new Request('https://example.com', {
      method: 'PATCH',
      authHeader: 'abcdefg',
      body: { id: 1, name: 'A name' },
    });

    expect(request).toHaveBeenCalledWith({
      uri: 'https://example.com',
      method: 'PATCH',
      body: { id: 1, name: 'A name' },
      qs: {},
      simple: false,
      resolveWithFullResponse: true,
      headers: {
        Authorization: 'abcdefg',
        Accept: 'application/json',
      },
      json: true,
    });
  });
});
