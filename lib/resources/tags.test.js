const Api = require('../api');
const { AUTH_TYPES } = require('../api/auth');

describe.only('API', () => {
  describe('tags', () => {
    test('should initialise list, set, delete helpers for supported entities', () => {
      const api = Api({
        authType: AUTH_TYPES.BASIC_AUTH,
        zendeskSubdomain: 'my-subdomain',
        email: 'email@example.com',
        password: 'pa$$word',
      });

      expect(api.tags.listForTicket).toBeInstanceOf(Function);
      expect(api.tags.setForTicket).toBeInstanceOf(Function);
      expect(api.tags.deleteForTicket).toBeInstanceOf(Function);
      expect(api.tags.addForTicket).toBeInstanceOf(Function);
      expect(api.tags.listForUser).toBeInstanceOf(Function);
      expect(api.tags.setForUser).toBeInstanceOf(Function);
      expect(api.tags.deleteForUser).toBeInstanceOf(Function);
      expect(api.tags.addForUser).toBeInstanceOf(Function);
      expect(api.tags.listForOrganization).toBeInstanceOf(Function);
      expect(api.tags.setForOrganization).toBeInstanceOf(Function);
      expect(api.tags.deleteForOrganization).toBeInstanceOf(Function);
      expect(api.tags.addForOrganization).toBeInstanceOf(Function);
    });
  });
});
