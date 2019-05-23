module.exports = ({ api }) => {
  api.users = {
    get: (id, queryParams) => api.request(`users/${id}.json`, { queryParams }),
    list: (queryParams) => api.request(`users.json`, { queryParams }),
    create: (body) => api.request(`users.json`, { method: 'POST', body }),
    update: (id, body) => api.request(`users/${id}.json`, { method: 'PUT', body }),
    createOrUpdate: (body) => api.request(`users/create_or_update.json`, { method: 'POST', body }),
    autocomplete: (queryParams) => api.request(`users/autocomplete.json`, { queryParams }),
  };

  return api;
};
