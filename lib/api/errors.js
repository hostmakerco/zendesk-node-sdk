class ZendeskRequestError extends Error {
  constructor(response) {
    super(response.statusMessage);
    this.statusCode = response.statusCode;
    this.statusMessage = response.statusMessage;
    this.message = response.body;
    this.headers = response.headers;
  }
}

module.exports.ZendeskRequestError = ZendeskRequestError;
