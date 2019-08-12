module.exports = ({ api }) => {
  api.attachments = {
    upload: (queryParams, data) => api.request('uploads.json', {
      method: 'POST',
      queryParams,
      rawBody: true,
      body: data,
      headers: {
        'Content-Type': 'application/binary',
      },
    }),
  };
  return api;
};
