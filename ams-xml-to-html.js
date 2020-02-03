const jsdom = require('jsdom');
const { JSDOM } = jsdom;

let recurseTheDom = {};
// for npx usage
try {
  recurseTheDom = require('ams-xml-to-html');
} catch (e) {
  recurseTheDom = require('./lib/recurseTheDom');
}

const setHead = (xmldoc, htmldoc) => {
  // TODO not in xslt not for articles but added by ams-html; change after switch to JS
  // add viewport meta tag
  const viewportmeta = htmldoc.createElement('meta');
  viewportmeta.setAttribute('name', 'viewport');
  viewportmeta.setAttribute('content', 'width=device-width');
  const isBook = xmldoc.firstElementChild.tagName === 'book'; // TODO extract into property or function?
  if (isBook) htmldoc.head.insertAdjacentElement('afterbegin', viewportmeta);

  // add charset meta tag
  const charset = htmldoc.createElement('meta');
  // TODO switch to modern charset and remove xslt matching code below
  // charset.setAttribute('charset', 'utf-8');
  // matches xslt
  charset.setAttribute('http-equiv', 'Content-Type');
  charset.setAttribute('content', 'text/html; charset=utf-8');
  htmldoc.head.insertAdjacentElement('afterbegin', charset);
  // set title
  const xmlTitle =
    xmldoc.querySelector('front>article-meta>title-group>alt-title') ||
    xmldoc.querySelector(
      'book-meta>book-title-group>book-title, front>article-meta>title-group>article-title'
    );
  htmldoc.title = xmlTitle ? xmlTitle.textContent : 'AMS Publication';
};

const xml2html = xmlstring => {
  const xml = new JSDOM(xmlstring, { contentType: 'text/xml' });
  const xmldoc = xml.window.document;

  const html = new JSDOM('');
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
  // const prettier = require('prettier');

  // const prettierConfig = {
  //   parser: 'html'
  // };

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
}
