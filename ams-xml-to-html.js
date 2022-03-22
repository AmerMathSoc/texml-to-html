import { xmlDom, htmlDom } from './lib/doms.js';
import { setHead } from './lib/head.js';
import recurseTheDom from './lib/recurseTheDom.js';

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

export default xml2html;
