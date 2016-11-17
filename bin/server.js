var app = require('..');

var server = app.listen(process.env.HTTP_PORT);
server.timeout = parseInt(process.env.APP_TIMEOUT, 10) || 12000;

console.log('Server started');
