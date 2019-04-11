# Zendesk NodeJS SDK

The Zendesk NodeJS SDK provides a wrapper around the Zendesk V2 REST JSON API.

Documentation for the API can be found at: https://developer.zendesk.com/rest_api/docs/zendesk-apis/resources

Zendesk Resources are declared under `lib/resources/**.js`, and will be injected into the `lib/api/index.js` object, which is then exported from `lib/index.js`.


### Libraries used
* [Node.js](https://nodejs.org/en/)
* [Jest](https://jestjs.io/)
* [Nock](https://github.com/nock/nock)


### Creating an API Object
Currently the API expects that you have curled your own admin token.

```
const Zendesk = require('@hostmakerco/zendesk-node-sdk')

const zendeskSubdomain = 'hostmakersupport';
const zendeskAdminToken = 'adminToken';
const zendesk = Zendesk({ zendeskSubdomain, zendeskAdminToken })
```

### Querying the API

CRUD actions should follow a common interface.

Notes: 
 - `queryParameters` and `body` values can be provided in `camelCase`, and will be serialised into `snake_case` as the API expects.
 - QueryStrings passed to the Zendesk API are accepted as comma separated values. You can however pass your values as an array, and they will be converted into a comma separated list at query time. Ie, `{ ids: [1, 2, 3] }` will become `?ids=1,2,3`
 - List data is auto-sorted by most recently created.


#### GET
```
const ticket = await zendesk.tickets.get(42, { ... query object ... });
```

#### LIST
```
const tickets = await zendesk.tickets.list({ ... query object ... });
```

#### CREATE
```
const ticket = await zendesk.tickets.create({ ... post data ... });
```

#### UPDATE
```
const ticket = await zendesk.tickets.update(id, { ... post data ... });
```

#### DELETE
```
await zendesk.tickets.delete(id);
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