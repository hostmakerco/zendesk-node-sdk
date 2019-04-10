module.exports.ZendeskRequestError = function ZendeskRequestError(response) {
  const err = new Error();
  err.statusCode = response.statusCode;
  err.statusMessage = response.statusMessage;
  err.message = response.body;
  err.headers = response.headers;
  return err;
};
