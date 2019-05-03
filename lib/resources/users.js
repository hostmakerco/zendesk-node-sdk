module.exports = ({ api }) => {
  api.users = {
    get: (id, queryParams) => api.request(`users/${id}.json`, { queryParams }),
    update: (id, body) => api.request(`users/${id}.json`, { method: 'PUT', body }),
    getIdentities: (id, queryParams) => api.request(`users/${id}/identities`, { queryParams }),
    updateIdentity: (id, identityId, body) =>
      api.request(`users/${id}/identities/${identityId}`, { method: 'PUT', body }),
  };

  return api;
};
