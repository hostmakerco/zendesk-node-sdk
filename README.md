# Zendesk NodeJS SDK

The Zendesk NodeJS SDK provides a wrapper around the Zendesk V2 REST JSON API.

Documentation for the API can be found at: https://developer.zendesk.com/rest_api/docs/zendesk-apis/resources

Zendesk Resources are declared under `lib/resources/**.js`, and will be injected into the `lib/api/index.js` object, which is then exported from `lib/index.js`.


### Libraries used
* [Node.js](https://nodejs.org/en/)
* [Jest](https://jestjs.io/)
* [Nock](https://github.com/nock/nock)


### Creating an API Object

```
const Zendesk = require('@hostmakerco/zendesk-node-sdk')

const zendeskSubdomain = 'hostmaker_support';
const zendeskAdminToken = 'adminToken';
const zendesk = Zendesk({ zendeskSubdomain, zendeskAdminToken })
```

### Querying the API
#### GET
```
const tickets = await zendesk.tickets.get(42, { queryParams: {} });
```

#### LIST
const tickets = await zendesk.tickets.list({ queryParams: {} });

#### CREATE
const tickets = await zendesk.tickets.create({ body: {} });

#### UPDATE
const tickets = await zendesk.tickets.update(id, { body: {} });

#### DELETE
const tickets = await zendesk.tickets.delete(id);

### Supported Resources
The Zendesk API is large, and not all API resources have been implemented yet.

Currently supported resources include:

#### Tickets:
 - Get
 - List
 - Create
 - Update
 - Delete