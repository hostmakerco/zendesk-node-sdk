# Zendesk NodeJS SDK

The Zendesk NodeJS SDK provides a wrapper around the Zendesk V2 REST JSON API.

Documentation for the API can be found at: https://developer.zendesk.com/rest_api/docs/zendesk-apis/resources

Zendesk Resources are declared under `lib/resources/**.js`, and will be injected into the `lib/api/index.js` object, which is then exported from `lib/index.js`.


### Libraries used
* [Node.js](https://nodejs.org/en/)
* [Jest](https://jestjs.io/)


### Creating an API Object

```
const Zendesk = require('@hostmakerco/zendesk-node-sdk')

const zendeskSubdomain = 'hostmaker_support';
const zendeskAdminToken = 'adminToken';
const zendesk = Zendesk({ zendeskSubdomain, zendeskAdminToken });

const tickets = await zendesk.tickets.list();
```