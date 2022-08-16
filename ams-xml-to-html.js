import { xmlDom, htmlDom } from './lib/doms.js';
import { setHead } from './lib/head.js';
import { Transformer } from './lib/transformer.js';

import { applyHacks } from './lib/hacks.js'; 

/**
 * 
 * @param {String} xmlstring - XML string
 * @param {Object} imageAltDictionary - Key value store with file names and alt text strings
 * @returns 
 */
const xml2html = (xmlstring, imageAltDictionary = {}) => {
  const xml = xmlDom(xmlstring);
  const xmldoc = xml.window.document;

  const html = htmlDom();
  const htmldoc = html.window.document;

  setHead(xmldoc, htmldoc);

  const root = xmldoc.querySelector('book, article');
  const transformer = new Transformer(htmldoc, imageAltDictionary);
  transformer.recurseTheDom(htmldoc.body, root);

  applyHacks(htmldoc);
  return html;
};

export default xml2html;
