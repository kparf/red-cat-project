const fs = require("fs")
const path = require('path');

const manifestPath = path.resolve(__dirname, '../_site/static/js/manifest.json');

const webpack = async (name) =>
  new Promise((resolve) => {
  fs.readFile(manifestPath, { encoding: 'utf8' }, (err, data) =>
    resolve(err ? `/static/${name}` : JSON.parse(data)[name])
  );
})

module.exports = {
  webpack
}