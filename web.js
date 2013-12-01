var express = require('express'),
    Q = require('q'),
    calMaker = require('./cal-maker.js');

function initWebApp(port) {
  var app = express(),
      defer = Q.defer();

  app.use(express.logger());

  // Predefined images.
  // url: /calendar/predefined_photo/2013/11
  app.get(/\/calendar\/([A-Za-z0-9]+)\/([0-9]{4})\/([1-9][0-2]{0,1})/, function(req, resp){
    // try to get pre-defined calendar maker.

    try {
      var loader = new calMaker.PredefinedImageLoader(req.params[0]);
      calMaker.make(loader,
                    parseInt(req.params[1]), /* year */
                    parseInt(req.params[2]), /* month */
                    'jpeg', /* output type */
                    resp /* output stream */);
    } catch (e) {
      resp.statusCode = 500;
      resp.end("Error: " + e);
    }
  });

  app.listen(port);
  setTimeout(defer.resolve, 0);
  return defer.promise;
}

exports.init = initWebApp;
