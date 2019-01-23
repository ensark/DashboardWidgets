var fs = require('fs');
var sourceName = './package.json';
var destName = './dist/sticos-widgets/package.json';
var destName2 = './projects/sticos-widgets/package.json';
var source = require(sourceName);
var dest = require(destName);
var dest2 = require(destName2);

dest.version = source.version;
dest2.version = source.version;

fs.writeFile(destName, JSON.stringify(dest, null, 2), function (err) {
  if (err) return console.log(err);
  console.log('writing to ' + destName);
});

fs.writeFile(destName2, JSON.stringify(dest2, null, 2), function (err) {
  if (err) return console.log(err);
  console.log('writing to ' + destName2);
});
