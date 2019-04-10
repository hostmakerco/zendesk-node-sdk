# Zendesk NodeJS SDK

The Zendesk NodeJS SDK provides a wrapper around the Zendesk V2 REST JSON API.

Zendesk Resources are declared under the `lib/resources/` folder, and will be injected into the `lib/Api` object, which is then exported from `lib/index`.


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