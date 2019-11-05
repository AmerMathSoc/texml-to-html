const fs = require('fs');
const path = require('path');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const createNode = (document, tagname, content, properties) => {
  if (!properties) properties = {};
  const node = document.createElement(tagname);
  if (content) node.innerHTML = content;
  for (let prop of Object.keys(properties))
    node.setAttribute(prop, properties[prop]);
  return node;
};

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
  const xmlTitle = xmldoc.querySelector(
    'book-meta>book-title-group>book-title, front>article-meta>title-group>alt-title, front>article-meta>title-group>article-title'
  );
  htmldoc.title = xmlTitle ? xmlTitle.textContent : 'AMS Publication';
};

elementProcessor = {
  preface: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const preface = createNode(htmldoc, 'section', '', { role: 'doc-preface' });
    htmlParentNode.appendChild(preface);
    passThrough(xmldoc, htmldoc, preface, xmlnode);
  },
  'book-meta': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const titlepage = createNode(htmldoc, 'section', '', {
      'data-ams-doc': 'titlepage'
    });
    htmlParentNode.appendChild(titlepage);

    const bookTitleGroup = xmlnode.querySelector('book-title-group');
    if (bookTitleGroup)
      recurseTheDom(xmldoc, htmldoc, titlepage, bookTitleGroup);

    const publKey = xmlnode.querySelector('book-id[book-id-type="publ_key"]');
    const series = publKey ? publKey.textContent : '';
    const seriesNode = createNode(htmldoc, 'span', series, {
      'data-ams-doc': 'series'
    });
    titlepage.appendChild(seriesNode);

    const contribGroupDL = createNode(htmldoc, 'dl');
    titlepage.appendChild(contribGroupDL);
    const contribGroup = xmlnode.querySelector('contrib-group');
    if (contribGroup)
      recurseTheDom(xmldoc, htmldoc, contribGroupDL, contribGroup);

    const footer = createNode(htmldoc, 'footer');
    titlepage.appendChild(footer);
    const footerDL = createNode(htmldoc, 'dl');
    footer.appendChild(footerDL);
    const footerDT = createNode(htmldoc, 'dt', 'Published by');
    footerDL.appendChild(footerDT);
    const publisher = xmlnode.querySelector('publisher');
    if (publisher) recurseTheDom(xmldoc, htmldoc, footerDL, publisher);

    const copyrightStatement = xmlnode.querySelector('copyright-statement');
    if (copyrightStatement)
      recurseTheDom(xmldoc, htmldoc, footer, copyrightStatement);
  },
  'book-title-group': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const header = createNode(htmldoc, 'header');
    htmlParentNode.appendChild(header);
    passThrough(xmldoc, htmldoc, header, xmlnode);
  },
  'book-title': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const heading = createNode(htmldoc, 'h1');
    htmlParentNode.appendChild(heading);
    passThrough(xmldoc, htmldoc, heading, xmlnode);
  },
  subtitle: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const isbookTitleGroup = Boolean(xmlnode.closest('book-title-group'));
    if (!isbookTitleGroup) {
      passThrough(xmldoc, htmldoc, htmlParentNode, xmlnode);
      return;
    }
    const p = createNode(htmldoc, 'p', '', { 'data-ams-doc': 'subtitle'});
    htmlParentNode.appendChild(p);
    passThrough(xmldoc, htmldoc, p, xmlnode);
  },
  'contrib-group': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    // TODO multiple templates
    // if book
    const dt = createNode(htmldoc, 'dt');
    htmlParentNode.appendChild(dt);
    // TODO very incomplete
  },
  publisher: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    // TODO multiple templates
    // if book
    const dd = createNode(htmldoc, 'dd', '', {
      'data-ams-doc': 'book publisher'
    });
    htmlParentNode.appendChild(dd);
  },
  'copyright-statement': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    // TODO multiple templates
    // if book
    const p = createNode(htmldoc, 'p', { 'data-ams-doc': 'book copyright' });
    htmlParentNode.appendChild(p);
    passThrough(xmldoc, htmldoc, p, xmlnode);
  }
};

// pass through elements
const passThrough = (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
  xmlnode.childNodes.forEach(
    recurseTheDom.bind(null, xmldoc, htmldoc, htmlParentNode)
  );
};

const passThroughElements = [
  'book',
  'front-matter',
  'book-body',
  'book-back',
  'book-part',
  'named-book-part-body',
  'book-part-meta',
  'body'
];
const enablePassThrough = tagname => {
  elementProcessor[tagname] = passThrough;
};
passThroughElements.forEach(enablePassThrough);

const recurseTheDom = (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
  if (xmlnode.nodeType === 3)
    htmlParentNode.appendChild(htmldoc.importNode(xmlnode, false));
  if (xmlnode.nodeType !== 1) return;
  // console.log(xmlnode.tagName);
  if (elementProcessor[xmlnode.tagName])
    elementProcessor[xmlnode.tagName](xmldoc, htmldoc, htmlParentNode, xmlnode);
  // else we drop/ignore the node
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
