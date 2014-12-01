var express = require('express'),
    childProcess = require('child_process');


var app = module.exports = express();


app.post('/:service', function (req, res) {
  childProcess.execFile('/usr/lib/fleet/bin/fleetctl', [
    '--endpoint=http://172.17.42.1:4001',
    'stop',
    req.params.service
  ], function (err, stdout, stderr) {
    res.write(stdout);
    res.write(stderr);
    if (err) { return res.status(500) && res.end(); }

    childProcess.execFile('/usr/lib/fleet/bin/fleetctl', [
      '--endpoint=http://172.17.42.1:4001',
      'start',
      req.params.service
    ], function (err, stdout, stderr) {
      res.write(stdout);
      res.write(stderr);
      if (err) { return res.status(500) && res.end(); }
      res.status(200);
      res.end();
    });
  });
});
