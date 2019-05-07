const snakeCase = require('snake-case');
const camelCase = require('camel-case');

function assertRequired(params) {
  Object.keys(params).forEach((key) => {
    if (params[key] === undefined) {
      throw new Error(`${key} is a required argument.`);
    }
  });
}

function isObject(object) {
  return object === Object(object) && typeof object !== 'function' && !Array.isArray(object);
}

function convertObjectArraysToCommaSeparatedList(object) {
  const data = {};

  Object.entries(object).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      data[key] = value.join(',');
      return;
    }
    if (isObject(value)) {
      data[key] = convertObjectArraysToCommaSeparatedList(value);
      return;
    }
    data[key] = value;
  });
  return data;
}

function convertKeys(object = {}, func) {
  const data = {};

  Object.entries(object).forEach(([key, value]) => {
    const transformedKey = func(key);

    if (isObject(value)) {
      data[transformedKey] = convertKeys(value, func);
      return;
    }

    if (Array.isArray(value)) {
      const transformedValues = value.map((innerValue) => {
        if (isObject(innerValue)) {
          return convertKeys(innerValue, func);
        }
        return innerValue;
      });
      data[transformedKey] = transformedValues;
      return;
    }

    data[transformedKey] = value;
  });
  return data;
}

function convertKeysToSnakeCase(object) {
  return convertKeys(object, snakeCase);
}

function convertKeysToCamelCase(object) {
  return convertKeys(object, camelCase);
}

module.exports = {
  assertRequired,
  isObject,
  convertObjectArraysToCommaSeparatedList,
  convertKeysToSnakeCase,
  convertKeysToCamelCase,
};
