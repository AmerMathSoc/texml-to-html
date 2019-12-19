const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const recurseTheDom = require('./recurseTheDom');

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

const main = xmlstring => {
  const xml = new JSDOM(xmlstring, { contentType: 'text/xml' });
  const xmldoc = xml.window.document;

  const html = new JSDOM('');
  const htmldoc = html.window.document;

  setHead(xmldoc, htmldoc);

  const root = xmldoc.querySelector('book, article');
  recurseTheDom(xmldoc, htmldoc, htmldoc.body, root);

  return html;
};

module.exports = main;

if (require.main === module) {
  const input = fs.readFileSync(path.resolve(process.argv[2])).toString();
  const output = path.resolve(process.argv[3]);
  const html = main(input);
  fs.writeFileSync(output, html.serialize());
}
