const Request = require('./request');
const { convertKeysToCamelCase } = require('../utils');
const { ZendeskRequestError } = require('./errors');

function Response(response = {}, { authHeader } = {}) {
  const body = convertKeysToCamelCase(response.body);

  function pageGetterFactory(pageUrl) {
    if (!pageUrl) {
      return null;
    }
    return async () => {
      const data = await new Request(pageUrl, { authHeader });
      return new Response(data, { authHeader });
    };
  }

  function isPaginated() {
    return (
      Object.prototype.hasOwnProperty.call(body, 'nextPage')
      || Object.prototype.hasOwnProperty.call(body, 'previousPage')
    );
  }

  const data = {
    body,
    statusCode: response.statusCode,
    headers: response.headers,
  };

  if (response.statusCode < 200 || response.statusCode >= 300) {
    throw new ZendeskRequestError({ response });
  }

  if (isPaginated()) {
    data.getPreviousPage = pageGetterFactory(body.previousPage);
    data.getNextPage = pageGetterFactory(body.nextPage);
  }

  return data;
}

module.exports = Response;
