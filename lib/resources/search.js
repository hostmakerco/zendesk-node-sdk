module.exports = ({ api }) => {
  api.search = queryParams => api.request('search.json', { queryParams });

  return api;
};
