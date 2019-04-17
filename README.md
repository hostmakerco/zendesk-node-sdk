# Zendesk NodeJS SDK

The Zendesk NodeJS SDK provides a wrapper around the Zendesk V2 REST JSON API.

Documentation for the API can be found at: https://developer.zendesk.com/rest_api/docs/zendesk-apis/resources

Zendesk Resources are declared under `lib/resources/**.js`, and will be injected into the `lib/api/index.js` object, which is then exported from `lib/index.js`.

### Installation
`yarn add zendesk-node`


### Libraries used
* [Node.js](https://nodejs.org/en/)
* [Jest](https://jestjs.io/)
* [Nock](https://github.com/nock/nock)


### Creating an API Object
Currently the API expects that you have curled your own admin token.

```
const Zendesk = require('zendesk-node')

const zendeskSubdomain = 'hostmakersupport';
const zendeskAdminToken = 'adminToken';
const zendesk = Zendesk({ zendeskSubdomain, zendeskAdminToken })
```

### Querying the API

CRUD actions should follow a common interface.

Notes: 
 - `queryParams` and `body` values can be provided in `camelCase`, and will be serialised into `snake_case` as the API expects.
 - GET requests to the Zendesk API expect Array values to be provided as comma separated values. The package will transform any Array values that are passed into a `queryParams` object at time. Ie, `{ ids: [1, 2, 3] }` will become `?ids=1,2,3`
 - List data is auto-sorted by most recently created.


#### GET
```
const ticket = await zendesk.tickets.get(42, { /* GET params */ });
```

#### LIST
```
const tickets = await zendesk.tickets.list({ /* GET params */ });
```

#### CREATE
```
const ticket = await zendesk.tickets.create({/* POST data */});
```

#### UPDATE
```
const ticket = await zendesk.tickets.update(42, {/* POST data */});
```

#### DELETE
```
await zendesk.tickets.delete(42);
```

### Supported Resources
The Zendesk API is large, and not all API resources have been implemented yet.

Currently supported resources include:

#### Tickets:
 - Get
 - List
 - Create
 - Update
 - Delete