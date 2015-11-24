var path = require('path'),
    express = require('express'),
    childProcess = require('child_process');


var DOCKITO_PROVISIONS_PATH = '/var/lib/dockito/provisions';


var app = module.exports = express();


app.use(function (req, res, next) {
  if (process.env.ACCESS_TOKEN !== req.query['access-token']) {
    return res.sendStatus(401);
  }
  next();
});


app.post('/:service', function (req, res) {
  var bashFilename = path.join(DOCKITO_PROVISIONS_PATH, req.params.service + '.1.sh');

  childProcess.execFile('/bin/sh', [ bashFilename ], function (err, stdout, stderr) {
    res.status(err ? 500 : 200);
    res.write(stdout);
    res.write(stderr);
    res.end();
  });
});
