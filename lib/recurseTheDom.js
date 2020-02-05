let htmldoc = {};
let elementProcessor = {};

const createNode = (tagname, content, properties) => {
  if (!properties) properties = {};
  const node = htmldoc.createElement(tagname);
  if (content) node.innerHTML = content;
  for (let prop of Object.keys(properties))
    node.setAttribute(prop, properties[prop]);
  return node;
};

const recurseTheDom = (htmlParentNode, xmlnode) => {
  if (!xmlnode) return;
  if (xmlnode.nodeType === 3)
    htmlParentNode.appendChild(htmldoc.importNode(xmlnode, false));
  if (xmlnode.nodeType !== 1) return;
  if (elementProcessor[xmlnode.tagName])
    elementProcessor[xmlnode.tagName](htmlParentNode, xmlnode);
  // else we drop/ignore the node
};

// pass through elements
const passThrough = (htmlParentNode, xmlnode) => {
  if (!xmlnode) return;
  xmlnode.childNodes.forEach(recurseTheDom.bind(null, htmlParentNode));
};

elementProcessor = {
  preface: require('./preface')(passThrough, createNode),
  'book-meta': require('./book-meta')(recurseTheDom, createNode),
  'book-title-group': require('./book-title-group')(passThrough, createNode),
  'book-title': require('./book-title')(passThrough, createNode),
  subtitle: require('./subtitle')(passThrough, createNode),
  'contrib-group': require('./contrib-group')(passThrough, createNode),
  contrib: require('./contrib')(recurseTheDom, createNode),
  email: require('./email')(createNode),
  xref: require('./xref')(passThrough, createNode),
  x: require('./x')(passThrough),
  uri: require('./uri')(createNode),
  'contrib-id': require('./contrib-id')(createNode),
  publisher: require('./publisher')(passThrough, createNode),
  'publisher-name': require('./publisher-name')(passThrough, createNode),
  'publisher-loc': require('./publisher-loc')(passThrough, createNode),
  'ref-list': require('./ref-list')(recurseTheDom, createNode),
  ref: require('./ref')(recurseTheDom, createNode),
  'mixed-citation': require('./mixed-citation')(passThrough, createNode),
  label: require('./label')(recurseTheDom, passThrough, createNode),
  'string-name': require('./string-name')(passThrough, createNode),
  'copyright-statement': require('./copyright-statement')(
    passThrough,
    createNode
  ),
  article: require('./article')(recurseTheDom, passThrough, createNode),
  'article-title': require('./article-title')(passThrough, createNode),
  'article-meta': require('./article-meta')(recurseTheDom, createNode),
  msc: require('./msc')(recurseTheDom, createNode),
  primary: require('./mscKey')(passThrough, createNode),
  'kwd-group': require('./kwd-group')(passThrough, createNode),
  kwd: require('./kwd')(passThrough, createNode),
  'funding-group': require('./funding-group')(passThrough, createNode),
  'meta-name': require('./meta-name')(passThrough, createNode),
  'meta-value': require('./meta-value')(passThrough, createNode),
  'journal-meta': require('./journal-meta')(createNode),
  'pub-date': require('./pub-date')(createNode),
  'self-uri': require('./self-uri')(createNode),
  'article-id': require('./article-id')(createNode),
  'article-citation': require('./article-citation')(createNode),
  notes: require('./notes')(passThrough, createNode),
  abstract: require('./abstract')(passThrough, createNode),
  sec: require('./sec')(passThrough, createNode),
  'styled-content': require('./styled-content')(passThrough, createNode),
  italic: require('./italic')(passThrough, createNode),
  bold: require('./bold')(passThrough, createNode),
  'disp-quote': require('./disp-quote')(passThrough, createNode),
  attrib: require('./attrib')(passThrough, createNode),
  fn: require('./fn')(passThrough, createNode),
  p: require('./p')(passThrough, createNode),
  'def-list': require('./def-list')(passThrough, createNode),
  'def-item': require('./def-item')(passThrough, createNode),
  term: require('./term')(passThrough, createNode),
  def: require('./def')(passThrough, createNode),
  app: require('./app')(passThrough, createNode),
  statement: require('./statement')(passThrough, createNode),
  secheading: require('./sec-heading')(passThrough, createNode),
  'sec-meta': require('./sec-meta')(recurseTheDom, createNode),
  graphic: require('./graphic')(createNode),
  img: require('./img')(createNode),
  fig: require('./fig')(passThrough, createNode),
  caption: require('./caption')(passThrough, createNode),
  toc: require('./toc')(recurseTheDom, createNode),
  'toc-entry': require('./toc-entry')(recurseTheDom, passThrough, createNode),
  'inline-formula': require('./formula')(passThrough, createNode),
  text: require('./text')(passThrough),
  'ext-link': require('./ext-link')(passThrough, createNode),
  break: require('./break')(createNode),
  target: require('./target')(passThrough, createNode)
};

// other mappings

const mapTag = (func, newtag) => (elementProcessor[newtag] = func);

const tagToDataStyle = require('./tagToDataStyle')(passThrough, createNode);
['roman', 'sc', 'monospace', 'underline'].forEach(
  mapTag.bind(null, tagToDataStyle)
);

mapTag(elementProcessor['primary'], 'secondary');
mapTag(elementProcessor['p'], 'funding-statement');
mapTag(elementProcessor['graphic'], 'inline-graphic');
mapTag(elementProcessor['inline-formula'], 'disp-formula');
mapTag(elementProcessor['label'], 'title');
['ack', 'front-matter-part', 'dedication'].forEach(
  mapTag.bind(null, elementProcessor['sec'])
);
['fig-group', 'verse-group'].forEach(
  mapTag.bind(null, elementProcessor['fig'])
);

const copyElement = require('./copyElement')(passThrough, createNode);
['sup', 'sub', 'table', 'tbody', 'thead', 'th', 'tr', 'td', 'pre', 'hr'].forEach(
  mapTag.bind(null, copyElement)
);

[
  'book',
  'front-matter',
  'book-body',
  'book-back',
  'book-part',
  'named-book-part-body',
  'book-part-meta',
  'body',
  'description',
  'custom-meta-group',
  'custom-meta',
  'permissions',
  'ams-meta-group',
  'table-wrap',
  'back',
  'alternatives',
  'tex-math',
  'title-group',
  'cite-group',
  'app-group'
].forEach(mapTag.bind(null, passThrough));

module.exports = (htmldom) => {
  htmldoc = htmldom;
  return recurseTheDom;
};
