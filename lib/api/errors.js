class ZendeskRequestError extends Error {
  constructor({ response = {} }) {
    const { body = {} } = response;

    super(response.statusMessage);
    this.statusCode = response.statusCode;
    this.statusMessage = response.statusMessage;
    this.message = body.description;
    this.headers = response.headers;
    this.error = body.error;
    this.details = body.details;
    this.requestOptions = response.requestOptions;
  }
}

module.exports.ZendeskRequestError = ZendeskRequestError;
