module.exports = ({ api }) => {
  api.tickets = {
    get: id => api.request(`tickets/${id}.json`),
    list: id => api.request(`tickets.json`),
  };
  return api;
};
