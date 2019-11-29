const fs = require('fs');
const path = require('path');
const prettier = require('prettier');

const xml2html = require('./main.js');

const inputFileName = process.argv[2];
const outputFileName = process.argv[3];

const inputString = fs.readFileSync(path.resolve(inputFileName));
const dom = xml2html(inputString);
fs.writeFileSync(
  path.resolve(outputFileName),
//   '<!DOCTYPE html>\n'+dom.serialize()
  prettier.format('<!DOCTYPE html>\n'+dom.serialize(), { parser: 'html' })
);
