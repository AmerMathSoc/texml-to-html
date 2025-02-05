import { xmlDom, htmlDom } from './lib/doms.js';
import { setHead } from './lib/head.js';
import { Transformer } from './lib/transformer.js';

import { fixContentModel } from './lib/postProcessing.js'; 

/**
 * 
 * @param {String} xmlstring - XML string
 * @param {Object} imageAltDictionary - Key value store with file names and alt text strings
 * @returns  {Document}
 */
const xml2html = (xmlstring, imageAltDictionary = {}) => {
  const xml = xmlDom(xmlstring);
  const xmldoc = xml.window.document;

  const root = xmldoc.querySelector('book, article');
  const isBook = root.tagName === 'book';

  const html = htmlDom();
  const htmldoc = html.window.document;

  setHead(xmldoc, htmldoc);

  const transformer = new Transformer(htmldoc, imageAltDictionary, isBook);
  transformer.recurseTheDom(htmldoc.body, root);

  fixContentModel(htmldoc);
  return html;
};

export default xml2html;
