module.exports = ({ api }) => {
  api.groups = {
    list: queryParams => api.request('groups.json', { queryParams }),
    listByUser: (userId, queryParams) => api.request(`users/${userId}/groups.json`, { queryParams }),
    listAssignables: queryParams => api.request('groups/assignable.json', { queryParams }),
    get: (id, queryParams) => api.request(`groups/${id}.json`, { queryParams }),
    create: body => api.request('groups.json', { method: 'POST', body }),
    update: (id, body) => api.request(`groups/${id}.json`, { method: 'PUT', body }),
    delete: id => api.request(`groups/${id}.json`, { method: 'DELETE' }),
  };

  return api;
};
