const fs = require('fs');
const path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

// const createChild = (document, parent, tagname) => {
//     const child = document.createElement(tagname);
//     parent.appendChild(child);
//     return child;
// }


// const createTitlepage = (document, root) => {
//     const titlepage = createChild(document, document.body, 'section');
//     titlepage.setAttribute('data-type','titlepage');
//     createJournalHead(document, root, titlepage);
//     const heading = createChild(document, titlepage, 'h1');
//     heading.innerHTML = root.querySelector('front article-meta title-group article-title').innerHTML;
//     handleAbstract(document, root, titlepage);
//     return titlepage;
// }

// const createJournalHead = (document, root, parent) => {
//     const header = createChild(document, parent, 'header');
//     const aside = createChild(document, header, 'aside');
//     aside.setAttribute('data-jats', 'journal');
//     const title = createChild(document, aside, 'p');
//     title.setAttribute('data-jats', 'title');
//     title.textContent = root.querySelector('front journal-meta journal-title-group journal-title').textContent;
//     return header;
// }

const setHead = (xmldoc, htmldoc) => {
  // add viewport meta tag
  const viewportmeta = htmldoc.createElement('meta');
  viewportmeta.setAttribute('name', 'viewport');
  viewportmeta.setAttribute('content', 'width=device-width');
  htmldoc.head.insertAdjacentElement('afterbegin', viewportmeta);
  // set title
  const xmlTitle = xmldoc.querySelector('book-meta>book-title-group>book-title, front>article-meta>title-group>alt-title, front>article-meta>title-group>article-title');
  htmldoc.title =  xmlTitle ? xmlTitle.textContent : 'Error: no title';
}

elementProcessor = {
  'book': function (xmldoc, htmldoc, element) {

  },
  'article': (xmldoc, htmldoc, element) => {

  },
  'book-meta': () => {}
}

// pass through elements
const passThrough = (xmldoc, htmldoc, htmlnode , xmlnode) => {
  xmlnode.childNodes.forEach(recurseTheDom.bind(null, htmldoc, xmldoc, htmlnode));
}
const passThroughElements = ['front-matter', 'book-body', 'book-back', 'book-part', 'named-book-part-body', 'book-part-meta', 'body']
const enablePassThrough = tagname => {
  elementProcessor[tagname] = passThrough;
};
passThroughElements.forEach(enablePassThrough);


const recurseTheDom = (xmldoc, htmldoc, htmlnode, xmlnode) => {
  if (xmlnode.nodeType === 3) htmlNode.appendChild(xmlNode);
  if (xmlnode.nodeType !== 1) return;
  // console.log(xmlnode.tagName);
  if (elementProcessor[xmlnode.tagName]) elementProcessor[xmlnode.tagName](xmldoc, htmldoc, htmlnode, xmlnode);
  // else we drop the node
}

const main = (xmlstring) => {
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
