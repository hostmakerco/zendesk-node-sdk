const Response = require('./response');

describe('Response', () => {
  test('should return body, statusCode & headers from a basic happy repsonse', () => {
    const responseData = {
      body: {
        some_data: 'asdasd',
      },
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
      },
    };

    const response = new Response(responseData);

    expect(response).toEqual({
      body: {
        someData: 'asdasd',
      },
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
      },
    });
  });

  test('should return a wrapped nextPageGetter when a nextPage url is in the body', () => {
    const responseData = {
      body: {
        some_data: 'asdasd',
        next_page: 'https://example.com/?next_page=2',
      },
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
      },
    };

    const response = new Response(responseData);

    expect(response.getNextPage).toBeInstanceOf(Function);
  });

  test('should not return nextPageGetter when nextPage/previousPage urls are absent from body', () => {
    const responseData = {
      body: {
        some_data: 'asdasd',
      },
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
      },
    };

    const response = new Response(responseData);

    const hasGetNextPage = Object.prototype.hasOwnProperty.call(response, 'getNextPage');

    expect(hasGetNextPage).toEqual(false);
  });

  test('should throw ZendeskRequestError for statusCodes over 299', () => {
    const responseData = {
      body: {
        some_data: 'asdasd',
      },
      statusCode: 500,
      headers: {
        'content-type': 'application/json',
      },
      requestOptions: { method: 'GET', queryParams: { x: 'x' } },
    };

    try {
      Response(responseData);
    } catch (e) {
      expect(e.constructor.name).toEqual('ZendeskRequestError');
      expect(e.requestOptions).toEqual({ method: 'GET', queryParams: { x: 'x' } });
    }
  });

  test('should throw ZendeskRequestError for statusCodes under 200', () => {
    const responseData = {
      body: {
        some_data: 'asdasd',
      },
      statusCode: 500,
      headers: {
        'content-type': 'application/json',
      },
    };

    try {
      Response(responseData);
    } catch (e) {
      expect(e.constructor.name).toEqual('ZendeskRequestError');
    }
  });
});
