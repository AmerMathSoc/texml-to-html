const { xmlDom, htmlDom } = require('./lib/doms.js');
const { setHead } = require('./lib/head.js');
const recurseTheDom = require('./lib/recurseTheDom');

const xml2html = xmlstring => {
  const xml = xmlDom(xmlstring);
  const xmldoc = xml.window.document;

  const html = htmlDom();
  const htmldoc = html.window.document;

  setHead(xmldoc, htmldoc);

  const root = xmldoc.querySelector('book, article');
  recurseTheDom(htmldoc)(htmldoc.body, root);

  return html;
};

module.exports = xml2html;

if (require.main === module) {
  const fs = require('fs');
  const path = require('path');

  const inputFileName = process.argv[2];
  const outputFileName = process.argv[3];

  const inputString = fs.readFileSync(path.resolve(inputFileName));
  const dom = xml2html(inputString);
  fs.writeFileSync(
    path.resolve(outputFileName),
    '<!DOCTYPE html>\n' + dom.querySelector('html').outerHTML
  );
}
