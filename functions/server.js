const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');

server.use(cors());
server.use(middlewares);
server.use('/api', router);

module.exports.handler = (event, context) => {
  const { path, httpMethod, headers, body } = event;
  const req = {
    method: httpMethod,
    url: path,
    headers,
    body,
  };

  const res = {
    setHeader: (name, value) => {
      headers[name.toLowerCase()] = value;
    },
    end: (text) => {
      context.succeed({
        statusCode: 200,
        headers,
        body: text,
      });
    },
    statusCode: 200,
    headers: {},
  };

  server.handle(req, res);
};
