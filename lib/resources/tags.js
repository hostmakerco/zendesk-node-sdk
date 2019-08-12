module.exports = ({ api }) => {
  function validateEntity(entity) {
    const ENTITY_TYPES = {
      organization: 'organizations',
      ticket: 'tickets',
      user: 'users',
    };

    if (!Object.values(ENTITY_TYPES).includes(entity)) {
      throw new Error(`Invalid Entity: provide one of ${Object.values(ENTITY_TYPES).join(', ')}`);
    }
    return entity;
  }

  api.tags = {
    list: queryParams => api.request('tags.json', { queryParams }),
    listFor: (id, entity, queryParams) => {
      validateEntity(entity);
      return api.request(`${entity}/${id}/tags.json`, { queryParams });
    },
    setFor: (id, entity, body) => {
      validateEntity(entity);
      return api.request(`${entity}/${id}/tags.json`, { method: 'POST', body });
    },
    addFor: (id, entity, body) => {
      validateEntity(entity);
      return api.request(`${entity}/${id}/tags.json`, { method: 'PUT', body });
    },
    deleteFor: (id, entity) => {
      validateEntity(entity);
      return api.request(`${entity}/${id}/tags.json`, { method: 'DELETE' });
    },
  };

  return api;
};
