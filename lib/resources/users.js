module.exports = ({ api }) => {
  api.users = {
    autocomplete: (queryParams) => api.request(`users/autocomplete.json`, { queryParams }),
  };

  return api;
};
