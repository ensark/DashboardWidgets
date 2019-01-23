var fs = require('fs');
fs.createReadStream('CHANGELOG.md').pipe(fs.createWriteStream('./dist/sticos-widgets/CHANGELOG.md'));
