const Request = require('./Request');
const { convertKeysToCamelCase } = require('./utils');
const { ZendeskRequestError } = require('./Errors');

function Response(response, { auth }) {
  function pageGetterFactory(pageUrl) {
    if (!pageUrl) {
      return null;
    }
    return async () => {
      const data = await new Request(pageUrl, { auth });
      return new Response(data, { auth });
    };
  }

  const data = convertKeysToCamelCase(response.body);

  if (response.statusCode >= 400) {
    throw new ZendeskRequestError(response);
  }
  data.getPreviousPage = pageGetterFactory(data.previousPage);
  data.getNextPage = pageGetterFactory(data.nextPage);

  return data;
}

module.exports = Response;
