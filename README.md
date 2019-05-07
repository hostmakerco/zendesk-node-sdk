# Zendesk NodeJS SDK

The Zendesk NodeJS SDK provides a wrapper around the Zendesk V2 REST JSON API.

Documentation for the API can be found at: https://developer.zendesk.com/rest_api/docs/zendesk-apis/resources

The Zendesk API is rate limited. To see how many requests per minute is allowed please refer to Zendesk's documentation [here](https://developer.zendesk.com/rest_api/docs/support/introduction#rate-limits).

https://developer.zendesk.com/rest_api/docs/support/introduction#rate-limits

Zendesk Resources are declared under `lib/resources/**.js`, and will be injected into the `lib/api/index.js` object, which is then exported from `lib/index.js`.

### Requirements
 - [Node.js](https://nodejs.org/en/) v8 (may work with previous versions but not supported)

### Installation
`yarn add zendesk-node`

### Libraries used
* [Node.js](https://nodejs.org/en/)
* [Jest](https://jestjs.io/)
* [Nock](https://github.com/nock/nock)

### Creating an API Object

> You must be a verified user to make API requests. You can authorize against the API using either basic authentication with your email address and password, with your email address and an API token, or with an OAuth access token. - [Zendesk Documentation](https://developer.zendesk.com/rest_api/docs/support/introduction#security-and-authentication)

#### Basic authentication

> If an agent or admin has enabled 2-factor authentication in their user profile, they won't be able to use basic authentication. Alternatives include using an API token or implementing an OAuth flow. [Learn more](https://develop.zendesk.com/hc/en-us/articles/360001074508). - [Zendesk Documentation](https://developer.zendesk.com/rest_api/docs/support/introduction#basic-authentication)

```js
const Zendesk = require('zendesk-node');

const email = 'AGENT_S_EMAIL_ADDRESS';
const password = 'AGENT_S_PASSWORD';
const zendeskSubdomain = 'ZENDESK_SUBDOMAIN';
const zendesk = Zendesk({ authType: Zendesk.AUTH_TYPES.BASIC_AUTH, zendeskSubdomain, email, password });
```

#### API token

```js
const Zendesk = require('zendesk-node');

const email = 'AGENT_S_EMAIL_ADDRESS';
const zendeskSubdomain = 'ZENDESK_SUBDOMAIN';
const zendeskAdminToken = 'API_TOKEN'; // Login to your Zendesk's Agent and go to Admin -> API to generate.
const zendesk = Zendesk({ authType: Zendesk.AUTH_TYPES.API_TOKEN, zendeskSubdomain, email, zendeskAdminToken });
```

#### Oauth access token
Currently the API expects that you have curled your own admin token.

```js
const Zendesk = require('zendesk-node');

const zendeskSubdomain = 'ZENDESK_SUBDOMAIN';
const zendeskAdminToken = 'OAUTH_ACCESS_TOKEN';
const zendesk = Zendesk({ authType: Zendesk.AUTH_TYPES.OAUTH_ACCESS_TOKEN, zendeskSubdomain, zendeskAdminToken });
```

Note: if `authType` is omitted the sdk defaults to oauth access token method.

### Querying the API

CRUD actions should follow a common interface.

Notes: 
 - `queryParams` and `body` values can be provided in `camelCase`, and will be serialised into `snake_case` as the API expects.
 - GET requests to the Zendesk API expect Array values to be provided as comma separated values. The package will transform any Array values that are passed into a `queryParams` object at time. Ie, `{ ids: [1, 2, 3] }` will become `?ids=1,2,3`
 - List data is auto-sorted by most recently created.


#### GET
```js
const ticket = await zendesk.tickets.get(42, { /* GET params */ });
```

#### LIST
```js
const tickets = await zendesk.tickets.list({ /* GET params */ });
```

#### CREATE
```js
const ticket = await zendesk.tickets.create({/* POST data */});
```

#### UPDATE
```js
const ticket = await zendesk.tickets.update(42, {/* POST data */});
```

#### DELETE
```js
await zendesk.tickets.delete(42);
```

### Supported Resources
The Zendesk API is large, and not all API resources have been implemented yet.

Currently supported resources include:

#### Tickets
 - [Show Ticket](https://developer.zendesk.com/rest_api/docs/support/tickets#show-ticket)
 - [List Tickets](https://developer.zendesk.com/rest_api/docs/support/tickets#list-tickets)
 - [Create Ticket](https://developer.zendesk.com/rest_api/docs/support/tickets#create-ticket)
 - [Update Ticket](https://developer.zendesk.com/rest_api/docs/support/tickets#update-ticket)
 - [Delete Ticket](https://developer.zendesk.com/rest_api/docs/support/tickets#delete-ticket)

#### Ticket comments
 - [List Comments](https://developer.zendesk.com/rest_api/docs/support/ticket_comments#list-comments)

#### Users
 - [Autocomplete Users](https://developer.zendesk.com/rest_api/docs/support/users#autocomplete-users)
