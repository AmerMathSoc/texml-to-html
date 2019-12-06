const fs = require('fs');
const path = require('path');
// const prettier = require('prettier');

// const prettierConfig = {
//   parser: 'html'
// };
const xml2html = require('./main.js');

const inputFileName = process.argv[2];
const outputFileName = process.argv[3];

const inputString = fs.readFileSync(path.resolve(inputFileName));
const dom = xml2html(inputString);
fs.writeFileSync(
  path.resolve(outputFileName),
  '<!DOCTYPE html>\n' + dom.serialize()
  // TODO prettier/prettier#7103 is preventing this
  // prettier.format('<!DOCTYPE html>\n' + dom.serialize(), prettierConfig).replace(/<!-- prettier-ignore -->/g, '')
);
