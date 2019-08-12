/* eslint no-underscore-dangle: ["error", { "allow": ["_marshallQueryString"] }] */
const request = require('request-promise');
const { convertObjectArraysToCommaSeparatedList, convertKeysToSnakeCase } = require('../utils');

function marshallQueryString(queryParams) {
  return convertKeysToSnakeCase(convertObjectArraysToCommaSeparatedList(queryParams));
}

function marshallBody(body) {
  return convertKeysToSnakeCase(body);
}

module.exports = function Request(
  uri,
  {
    method = 'GET', authHeader = {}, body = {}, queryParams = {}, headers = {}, rawBody = false,
  },
) {
  let processedBody;

  if (method === 'GET' && (!queryParams.sortBy && !queryParams.sortOrder)) {
    Object.assign(queryParams, { sortBy: 'created_at', sortOrder: 'desc' });
  }

  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    processedBody = rawBody ? body : marshallBody(body);
  }

  const options = {
    uri,
    method,
    qs: marshallQueryString(queryParams),
    body: processedBody,
    simple: false,
    resolveWithFullResponse: true,
    headers: {
      Authorization: authHeader,
      Accept: 'application/json',
      ...headers,
    },
    json: !rawBody,
  };

  return request(options).then((response) => {
    if (rawBody) {
      // parse manually since we turned it off for rawBody above
      response.body = JSON.parse(response.body);
    }
    response.requestOptions = options;
    return response;
  });
};
