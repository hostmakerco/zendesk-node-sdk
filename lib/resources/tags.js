const taggableEntities = [
  {
    keyName: 'Ticket',
    urlPrefix: 'tickets',
  },
  {
    keyName: 'User',
    urlPrefix: 'users',
  },
  {
    keyName: 'Organization',
    urlPrefix: 'organizations',
  },
];

module.exports = ({ api }) => {
  function initTagHelpersForEntities() {
    const actionsPerEntity = taggableEntities.map(entity => ({
      [`listFor${entity.keyName}`]: (id, queryParams) => api.request(`${entity.keyName}/${id}/tags.json`, { queryParams }),
      [`setFor${entity.keyName}`]: (id, body) => api.request(`${entity.keyName}/${id}/tags.json`, { method: 'POST', body }),
      [`addFor${entity.keyName}`]: (id, body) => api.request(`${entity.keyName}/${id}/tags.json`, { method: 'PUT', body }),
      [`deleteFor${entity.keyName}`]: id => api.request(`${entity.keyName}/${id}/tags.json`, { method: 'DELETE' }),
    }));

    return actionsPerEntity.reduce((accumulator, currentValue) => ({
      ...accumulator,
      ...currentValue,
    }), {});
  }

  api.tags = {
    list: queryParams => api.request('tags.json', { queryParams }),
    ...initTagHelpersForEntities(),
  };

  return api;
};
