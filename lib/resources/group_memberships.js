module.exports = ({ api }) => {
  api.groupMemberships = {
    list: queryParams => api.request('group_memberships.json', { queryParams }),
    listByUser: (userId, queryParams) => api.request(`users/${userId}/group_membership.json`, { queryParams }),
    listByGroup: (groupId, queryParams) => api.request(`groups/${groupId}/memberships.json`, { queryParams }),
    listAssignables: queryParams => api.request('group_memberships/assignable.json', { queryParams }),
    listAssignablesByGroup: (groupId, queryParams) => api.request(`groups/${groupId}/memberships/assignable.json`, { queryParams }),
    get: (id, queryParams) => api.request(`group_memberships/${id}.json`, { queryParams }),
    getByUser: (userId, id, queryParams) => api.request(`users/${userId}/group_memberships/${id}.json`, { queryParams }),
    create: body => api.request('group_memberships.json', { method: 'POST', body }),
    delete: id => api.request(`group_memberships/${id}.json`, { method: 'DELETE' }),
    deleteByUser: (userId, id) => api.request(`users/${userId}/group_memberships/${id}.json`, { method: 'DELETE' }),
    setAsDefault: (userId, membershipId, body) => api.request(`users/${userId}/group_memberships/${membershipId}/make_default.json`, { method: 'PUT', body }),
  };

  return api;
};
