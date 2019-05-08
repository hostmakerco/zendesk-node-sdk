module.exports = ({ api }) => {
  api.users = {
    get: (id, queryParams) => api.request(`users/${id}.json`, { queryParams }),
    create: (body) => api.request(`users.json`, { method: 'POST', body }),
    update: (id, body) => api.request(`users/${id}.json`, { method: 'PUT', body }),
    autocomplete: (queryParams) => api.request(`users/autocomplete.json`, { queryParams }),
  };

  return api;
};
