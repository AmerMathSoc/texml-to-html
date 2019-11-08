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

const attributeDictionary = {
  id: 'id',
  rowspan: 'rowspan',
  colspan: 'colspan',
  'content-type': 'data-ams-content-type',
  'has-qed-box': 'data-ams-qed-box',
  hidden: 'hidden',
  position: 'data-ams-position',
  style: 'data-ams-style',
  'specific-use': 'data-ams-specific-use' // NOTE generic fallback; elementProcessors who do something different should remove the attribute from the xmlnode before calling mapAttributes
};

mapAttribute = (htmlNode, xmlNode, attributeName) => {
  const attributeValue = xmlNode.getAttribute(attributeName);
  if (!attributeValue) return;
  htmlNode.setAttribute(attributeName, attributeDictionary[attributeValue]);
};

const mapAttributes = (htmlNode, xmlNode) => {
  Object.keys(attributeDictionary).forEach(
    mapAttribute.bind(null, htmlNode, xmlNode)
  );
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
  const xmlTitle = xmldoc.querySelector('front>article-meta>title-group>alt-title') || xmldoc.querySelector('book-meta>book-title-group>book-title, front>article-meta>title-group>article-title'
  );
  htmldoc.title = xmlTitle ? xmlTitle.textContent : 'AMS Publication';
};

const getClosestLevel = htmlParentNode => {
  const ancestor = htmlParentNode.closest('[data-ams-doc-level]');
  if (ancestor) return ancestor.getAttribute('data-ams-doc-level');
  else return null;
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
    // NOTE was multiple templates: book-title-group/subtitle and mode=generic)
    const isbookTitleGroup = Boolean(xmlnode.closest('book-title-group'));
    if (!isbookTitleGroup) {
      passThrough(xmldoc, htmldoc, htmlParentNode, xmlnode);
      return;
    }
    const p = createNode(htmldoc, 'p', '', { 'data-ams-doc': 'subtitle' });
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
    // only used in books
    const dd = createNode(htmldoc, 'dd', '', {
      'data-ams-doc': 'book publisher'
    });
    htmlParentNode.appendChild(dd);
    passThrough(xmldoc, htmldoc, dd, xmlnode);
  },
  'publisher-name': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const span = createNode(htmldoc, 'span', '');
    htmlParentNode.appendChild(span);
    passThrough(xmldoc, htmldoc, span, xmlnode);
    if (xmlnode.nextElementSibling) {
      htmlParentNode.appendChild(htmldoc.createTextNode(', '));
    }
  },
  'publisher-loc': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const span = createNode(htmldoc, 'span', '');
    htmlParentNode.appendChild(span);
    passThrough(xmldoc, htmldoc, span, xmlnode);
  },
  'ref-list': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const level = xmldoc.firstElementChild.tagName === 'book' ? '1' : '2'; // NOTE checks if document is a book
    const section = createNode(htmldoc, 'section', '', {
      role: 'doc-bibliography',
      'data-ams-doc-level': level
    });
    mapAttributes(section, xmlnode);
    htmlParentNode.appendChild(section);
    recurseTheDom(xmldoc, htmldoc, section, xmlnode.querySelector('title'));
    const dl = createNode(htmldoc, 'dl', '');
    section.appendChild(dl);
    xmlnode
      .querySelectorAll('ref')
      .forEach(recurseTheDom.bind(null, xmldoc, htmldoc, dl));
  },
  title: (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const level = getClosestLevel(htmlParentNode);
    const heading = createNode(htmldoc, `h${level}`, '');
    htmlParentNode.appendChild(heading);
    passThrough(xmldoc, htmldoc, heading, xmlnode);
    // TODO continue or could this be enough?
  },
  'copyright-statement': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    // TODO multiple templates
    // if book
    const p = createNode(htmldoc, 'p', '', {
      'data-ams-doc': 'book copyright'
    });
    htmlParentNode.appendChild(p);
    passThrough(xmldoc, htmldoc, p, xmlnode);
  },
  article:  (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const section = createNode(htmldoc, 'section', '', { 'data-ams-doc': 'titlepage'});
    htmlParentNode.appendChild(section);

    const header = createNode(htmldoc, 'header');
    section.appendChild(header);

    const journalInfo = createNode(htmldoc, 'aside', '', { 'data-ams-doc': 'journal'});
    header.appendChild(journalInfo);

    const journalTitle = createNode(htmldoc, 'p', xmldoc.querySelector('front>journal-meta>journal-title-group>journal-title').textContent, { 'data-ams-doc': 'journal title'}); // NOTE no recursion (matches xslt)
    journalInfo.appendChild(journalTitle);
    const journalLocation = createNode(htmldoc, 'p', '', { 'data-ams-doc': 'journal location'});
    journalInfo.appendChild(journalLocation);
    journalLocation.appendChild(createNode(htmldoc, 'span', `Volume ${xmldoc.querySelector('front>article-meta>volume').textContent}, `, { 'data-ams-doc': 'journal volume'}));
    journalLocation.appendChild(htmldoc.createTextNode(', '));
    journalLocation.appendChild(createNode(htmldoc, 'span', `Issue ${xmldoc.querySelector('front>article-meta>issue').textContent}`, { 'data-ams-doc': 'journal issue'}));
    journalLocation.appendChild(createNode(htmldoc, 'span', `(${xmldoc.querySelector('front>article-meta>pub-date[iso-8601-date]').getAttribute('iso-8601-date')})`, { 'data-ams-doc': 'journal date'}));

    const journalPii = createNode(htmldoc, 'p', '', { 'data-ams-doc': 'journal pii'});
    journalInfo.appendChild(journalPii);
    journalPii.appendChild(createNode(htmldoc, 'a', xmldoc.querySelector('front>article-meta>article-id[pub-id-type="pii"]').textContent, { 'href': `https://doi.org/${xmldoc.querySelector('front>article-meta>article-id[pub-id-type="doi"]').textContent}`}));

    recurseTheDom(xmldoc, htmldoc, header, xmldoc.querySelector('front>article-meta>title-group>article-title'));
    recurseTheDom(xmldoc, htmldoc, header, xmldoc.querySelector('front>notes[notes-type="dedication"]'));

    // add abstract
    recurseTheDom(xmldoc, htmldoc, section, xmldoc.querySelector('front>article-meta>abstract'));

    // add copyright page
    recurseTheDom(xmldoc,htmldoc, htmlParentNode, xmldoc.querySelector('front>article-meta'));

    // the article wrapper
    const artSection = createNode(htmldoc, 'section', '', { 'data-ams-doc': 'article'});
    htmlParentNode.appendChild(artSection);
    // heading (again) TODO[postrelease] ams-html replaces this heading with the titlepage; after release, drop this heading and update ams-html
    recurseTheDom(xmldoc, htmldoc, artSection, xmldoc.querySelector('front>article-meta>title-group>article-title'));
    // recurse throught the article content
    passThrough(xmldoc, htmldoc, artSection, xmlnode);
  },
  'article-title':   (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const h1 = createNode(htmldoc, 'h1');
    htmlParentNode.appendChild(h1);
    passThrough(xmldoc, htmldoc, h1, xmlnode);
  },
  'article-meta':   (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const section = createNode(htmldoc, 'section', '', {'data-ams-doc': 'copyright-page'});
    htmlParentNode.appendChild(section);
    // TODO TBC
  },
  'notes': (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    // so far, we only have one type
    if (xmlnode.getAttribute('notes-type') !== 'dedication') return;
    const div = createNode(htmldoc, 'div', '', {role: 'doc-dedication'});
    htmlParentNode.appendChild(div);
    passThrough(xmldoc, htmldoc, div, xmlnode);
  },
  abstract:  (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const level = getClosestLevel(htmlParentNode) || '2'; // NOTE in articles, we don't have a disp-level in the XML; also NOTE that this is a change from xslt which erroneously had hardcoded 1 but abstract/title still got an h2
    const section = createNode(htmldoc, 'section', '', {'data-ams-doc-level': level, role: 'doc-abstract'});
    mapAttributes(section, xmlnode);
    htmlParentNode.appendChild(section);
    passThrough(xmldoc, htmldoc, section, xmlnode);
  },
  sec:   (xmldoc, htmldoc, htmlParentNode, xmlnode) => {
    const level = getClosestLevel(htmlParentNode) || xmlnode.closest('[disp-level]').getAttribute('disp-level');
    const section = createNode(htmldoc, 'section', '', {'data-ams-doc-level': level, 'data-ams-doc': xmlnode.getAttribute('specific-use')});
    // mapAttributes(section, xmlnode);
    htmlParentNode.appendChild(section);
    passThrough(xmldoc, htmldoc, section, xmlnode);
  },
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
  if (!xmlnode) return;
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
