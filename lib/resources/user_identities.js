module.exports = ({ api }) => {
  api.usersIdentities = {
    get: (userId, id, queryParams) => api.request(`users/${userId}/identities/${id}.json`, { queryParams }),
    list: (userId, queryParams) => api.request(`users/${userId}/identities.json`, { queryParams }),
    create: (userId, body) => api.request(`users/${userId}/identities.json`, { method: 'POST', body }),
    update: (userId, id, body) => api.request(`users/${userId}/identities/${id}.json`, { method: 'PUT', body }),
    delete: (userId, id) => api.request(`users/${userId}/identities/${id}.json`, { method: 'DELETE' }),
    makePrimary: (userId, id) => api.request(`users/${userId}/identities/${id}/make_primary.json`, { method: 'PUT' }),
  };
  return api;
};
