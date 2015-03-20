var path = require('path'),
    express = require('express'),
    childProcess = require('child_process');


var DOCKER_PROVISIONERS_PATH = '/var/docker-provisioners';


var app = module.exports = express();


app.post('/:service', function (req, res) {
  var bashFilename = path.join(DOCKER_PROVISIONERS_PATH, req.params.service + '.1.sh');

  childProcess.execFile('/bin/sh', [ bashFilename ], function (err, stdout, stderr) {
    res.write(stdout);
    res.write(stderr);
    res.status(err ? 500 : 200);
    res.end();
  });
});
