module.exports = ({ api }) => {
  api.views = {
    list: queryParams => api.request('views.json', { queryParams }),
    get: (id, queryParams) => api.request(`views/${id}.json`, { queryParams }),
    create: body => api.request('views.json', { method: 'POST', body }),
    update: (id, body) => api.request(`views/${id}.json`, { method: 'PUT', body }),
    delete: id => api.request(`views/${id}.json`, { method: 'DELETE' }),
    listTickets: (id, queryParams) => api.request(`views/${id}/tickets.json`, { queryParams }),
  };

  return api;
};
