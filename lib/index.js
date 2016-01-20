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
  var deploy = childProcess.spawn('/bin/bash', [ bashFilename ]);
  var chunks = { stdout: '', stderr: '' };

  deploy.stdout.on('data', function (data) {
    chunks.stdout += data;
  });
  
  deploy.stderr.on('data', function (data) {
    chunks.stderr += data;
    deploy.kill();
  });

  deploy.on('close', function (code) {
    res.status(code === 0 ? 200 : 500);
    res.write(chunks.stdout);
    res.write(chunks.stderr);
    res.end();
  });
});
