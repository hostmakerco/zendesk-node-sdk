module.exports = ({ api }) => {
  api.tickets = {
    _sideLoadingOptions: {
      singleTicket: ['metric_events', 'slas'],
      any: [
        'users',
        'groups',
        'organizations',
        'last_audits',
        'metric_sets',
        'dates',
        'sharing_agreements',
        'comment_count',
        'incident_counts',
        'ticket_forms',
      ],
    },
    get: (id, queryParams) => api.request(`tickets/${id}.json`, { queryParams }),
    list: queryParams => api.request('tickets.json', { queryParams }),
    listTicketsByType: (userId, type = 'requested', queryParams) => api.request(`users/${userId}/tickets/${type}.json`, { queryParams }),
    create: body => api.request('tickets.json', { method: 'POST', body }),
    createMany: body => api.request('imports/tickets/create_many.json', { method: 'POST', body }),
    update: (id, body) => api.request(`tickets/${id}.json`, { method: 'PUT', body }),
    delete: id => api.request(`tickets/${id}.json`, { method: 'DELETE' }),
    bulkDelete: ids => api.request('tickets/destroy_many.json', { method: 'DELETE', queryParams: { ids } }),
    listComments: (id, queryParams) => api.request(`tickets/${id}/comments.json`, { queryParams }),
    merge: (id, body) => api.request(`tickets/${id}/merge.json`, { body }),
  };
  return api;
};
