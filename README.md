

# hapi-consolidate
[Hapi.js](http://hapijs.com/) dynamic template rendering using [consolidate](https://www.npmjs.com/package/consolidate). hapi-consolidate adds two new methods to the [server](https://github.com/hapijs/hapi/blob/master/API.md#server) and [reply](https://github.com/hapijs/hapi/blob/master/API.md#reply-interface) interfaces of Hapi.js.

## Installation
    npm install --save hapi-consolidate

## Example
```javascript
const Hapi = require("hapi");
const path = require("path");
const server = new Hapi.Server();
server.connection({port: 8080});

server.register(require("hapi-consolidate"), err => {
  if (err) throw err;
  server.consolidate({
    name: "pug",
    path: path.resolve(__dirname, 'views'),
    extension: 'pug',
    options: {
      cache: true
    }
  });
});

server.route({
  method: 'GET',
  path: '/',
  config: {
    handler: (request, reply) => {
      reply.render('index', {username: 'admin'});
    }
  }
});

server.start(err => {
  if (err) throw err;
});
```
