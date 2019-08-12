module.exports = ({ api }) => {
  api.users = {
    list: queryParams => api.request('users.json', { queryParams }),
    listByGroup: (groupId, queryParams) => api.request(`/groups/${groupId}/users.json`, { queryParams }),
    listByOrganization: (organizationId, queryParams) => api.request(`/organizations/${organizationId}/users.json`, { queryParams }),
    get: (id, queryParams) => api.request(`users/${id}.json`, { queryParams }),
    showMany: queryParams => api.request('users/show_many.json', { queryParams }),
    create: body => api.request('users.json', { method: 'POST', body }),
    update: (id, body) => api.request(`users/${id}.json`, { method: 'PUT', body }),
    createOrUpdate: body => api.request('users/create_or_update.json', { method: 'POST', body }),
    delete: id => api.request(`users/${id}.json`, { method: 'DELETE' }),
    autocomplete: queryParams => api.request('users/autocomplete.json', { queryParams }),
  };

  return api;
};
