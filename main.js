var web_js = require('./web.js');

web_js.init(3000).
  then(function() {
    console.log("Loaded");
  });
