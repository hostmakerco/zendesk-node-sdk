const Api = require('../api');
const { AUTH_TYPES } = require('../api/auth');

describe('API', () => {
  describe('tags', () => {
    const api = Api({
      authType: AUTH_TYPES.BASIC_AUTH,
      zendeskSubdomain: 'my-subdomain',
      email: 'email@example.com',
      password: 'pa$$word',
    });

    test('should initialise list, set, delete helpers for supported entities', () => {
      expect(api.tags.listFor).toBeInstanceOf(Function);
      expect(api.tags.setFor).toBeInstanceOf(Function);
      expect(api.tags.deleteFor).toBeInstanceOf(Function);
      expect(api.tags.addFor).toBeInstanceOf(Function);
    });

    test('should throw given invalid entity type', () => {
      expect(() => api.tags.listFor(123, 'invalid_entity', {}))
        .toThrow('Invalid Entity: provide one of organizations, tickets, users');
    });
  });
});
