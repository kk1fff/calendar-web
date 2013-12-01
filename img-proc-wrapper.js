var child_process = require('child_process');

exports.produceImage = function(year, month, img_abs_path, outputFormat) {
  var p = child_process.spawn(
    process.env.PYTHON2 || "python",
    [__dirname + "/../image_processor/easy-cal.py",
     '-stdout',
     '' + year,
     '' + month,
     process.env.DEFAULT_FONT,
     img_abs_path]);
  p.stderr.on('data', function(d) {
    console.error('Child report: ' + d.toString('utf8'));
  });
  return p.stdout;
};
