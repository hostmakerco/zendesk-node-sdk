/* eslint no-underscore-dangle: ["error", { "allow": ["_marshallQueryString"] }] */
const request = require('request-promise');
const { convertObjectArraysToCommaSeparatedList, convertKeysToSnakeCase } = require('../utils');

function marshallQueryString(queryParams) {
  if (!queryParams.sortBy && !queryParams.sortOrder) {
    Object.assign(queryParams, { sortBy: 'created_at', sortOrder: 'desc' });
  }
  return convertKeysToSnakeCase(convertObjectArraysToCommaSeparatedList(queryParams));
}

function marshallBody(body) {
  return convertKeysToSnakeCase(body);
}

module.exports = function Request(uri, { method = 'GET', auth = {}, body = {}, queryParams = {} }) {
  let qs;
  let processedBody;

  if (method === 'GET') {
    qs = marshallQueryString(queryParams);
  }

  if (['POST', 'PUT', 'PATCH'].includes(method)) {
    processedBody = marshallBody(body);
  }

  const { zendeskAdminToken } = auth;

  const options = {
    uri,
    method,
    qs,
    body: processedBody,
    simple: false,
    resolveWithFullResponse: true,
    headers: {
      Authorization: `Bearer ${zendeskAdminToken}`,
      Accept: 'application/json',
    },
    json: true,
  };

  return request(options);
};
