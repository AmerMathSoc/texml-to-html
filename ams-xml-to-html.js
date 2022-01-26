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
