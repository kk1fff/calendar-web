var util = require('util'),
    imgProcWrapper = require('./img-proc-wrapper.js');

function Loader() {
}

Loader.prototype.getFilename = function() {
  throw new Error("Not Implemented");
};

////////////////////////////////////////////////////////////////////////////////

var PREDEFINED_MAP = {
  "flower": "flower.jpg"
};

function PredefinedImageLoader(name) {
  if (!(name in PREDEFINED_MAP)) {
    throw new Error("No such predefined image");
  }

  this._filename = __dirname + "/predefined_images/" + PREDEFINED_MAP[name];
}

util.inherits(PredefinedImageLoader, Loader);

PredefinedImageLoader.prototype.getFilename = function() {
  return this._filename;
};

////////////////////////////////////////////////////////////////////////////////

function make(loader, year, month, outputFormat, outputStream) {
  var rStream = imgProcWrapper.produceImage(year,
                                            month,
                                            loader.getFilename(),
                                            outputFormat);
  rStream.on('data', function(d) {
    outputStream.write(d);
  });
  rStream.on('close', function() {
    outputStream.end();
  });
}

exports.PredefinedImageLoader = PredefinedImageLoader;
exports.make = make;
