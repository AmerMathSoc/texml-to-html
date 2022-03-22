import CopyElement from './copyElement.js';
import Preface from './preface.js';
import BookMeta from './book-meta.js';
import BookTitle from './book-title.js';
import Subtitle from './subtitle.js';
import ContribGroup from './contrib-group.js';
import Contrib from './contrib.js';
import Email from './email.js';
import Xref from './xref.js';
import X from './x.js';
import Uri from './uri.js';
import ContribId from './contrib-id.js';
import RefList from './ref-list.js';
import Ref from './ref.js';
import MixedCitation from './mixed-citation.js';
import Label from './label.js';
import StringName from './string-name.js';
import CopyrightStatement from './copyright-statement.js';
import Article from './article.js';
import ArticleTitle from './article-title.js';
import ArticleMeta from './article-meta.js';
import Msc from './msc.js';
import MscKey from './mscKey.js';
import KwdGroup from './kwd-group.js';
import Kwd from './kwd.js';
import FundingGroup from './funding-group.js';
import MetaName from './meta-name.js';
import MetaValue from './meta-value.js';
import JournalMeta from './journal-meta.js';
import PubDate from './pub-date.js';
import SelfUri from './self-uri.js';
import ArticleId from './article-id.js';
import ArticleCitation from './article-citation.js';
import Notes from './notes.js';
import Abstract from './abstract.js';
import Sec from './sec.js';
import StyledContent from './styled-content.js';
import Italic from './italic.js';
import Bold from './bold.js';
import DispQuote from './disp-quote.js';
import Attrib from './attrib.js';
import Fn from './fn.js';
import P from './p.js';
import DefList from './def-list.js';
import DefItem from './def-item.js';
import Term from './term.js';
import Def from './def.js';
import App from './app.js';
import Statement from './statement.js';
import SecHeading from './sec-heading.js';
import SecMeta from './sec-meta.js';
import Graphic from './graphic.js';
import Img from './img.js';
import Fig from './fig.js';
import Caption from './caption.js';
import Toc from './toc.js';
import TocEntry from './toc-entry.js';
import Formula from './formula.js';
import Text from './text.js';
import ExtLink from './ext-link.js';
import Break from './break.js';
import Target from './target.js';
import BoxedText from './boxed-text.js';
import Table from './table.js';
import Underline from './underline.js';
import DispFormulaGroup from './disp-formula-group.js';
import SimpleTabbing from './simpletabbing.js';
import Line from './line.js';
import SubjGroup from './subj-group.js';
import Subject from './subject.js';
import Monospace from './monospace.js';
import Roman from './roman.js';
import SansSerif from './sans-serif.js';
import Sc from './sc.js';

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

// copy elements
const copyElement = CopyElement(passThrough, createNode);;

elementProcessor = {
  preface: Preface(passThrough, createNode),
  'book-meta': BookMeta(recurseTheDom, passThrough, createNode),
  'book-title': BookTitle(passThrough, createNode),
  subtitle: Subtitle(passThrough, createNode),
  'contrib-group': ContribGroup(passThrough, createNode),
  contrib: Contrib(recurseTheDom, passThrough, createNode),
  email: Email(createNode),
  xref: Xref(recurseTheDom, passThrough, createNode),
  x: X(passThrough),
  uri: Uri(createNode),
  'contrib-id': ContribId(createNode),
  'ref-list': RefList(recurseTheDom, passThrough, createNode),
  ref: Ref(recurseTheDom, createNode),
  'mixed-citation': MixedCitation(passThrough, createNode),
  label: Label(recurseTheDom, passThrough, createNode),
  'string-name': StringName(passThrough, createNode),
  'copyright-statement': CopyrightStatement(
    passThrough,
    createNode
  ),
  article: Article(recurseTheDom, passThrough, createNode),
  'article-title': ArticleTitle(passThrough, createNode),
  'article-meta': ArticleMeta(recurseTheDom, createNode),
  msc: Msc(recurseTheDom, createNode),
  primary: MscKey(passThrough, createNode),
  'kwd-group': KwdGroup(passThrough, createNode),
  kwd: Kwd(passThrough, createNode),
  'funding-group': FundingGroup(passThrough, createNode),
  'meta-name': MetaName(passThrough, createNode),
  'meta-value': MetaValue(passThrough, createNode),
  'journal-meta': JournalMeta(createNode),
  'pub-date': PubDate(createNode),
  'self-uri': SelfUri(createNode),
  'article-id': ArticleId(createNode),
  'article-citation': ArticleCitation(createNode),
  notes: Notes(passThrough, createNode),
  abstract: Abstract(passThrough, createNode),
  sec: Sec(passThrough, createNode),
  'styled-content': StyledContent(passThrough, createNode),
  italic: Italic(passThrough, createNode),
  bold: Bold(passThrough, createNode),
  'disp-quote': DispQuote(passThrough, createNode),
  attrib: Attrib(passThrough, createNode),
  fn: Fn(passThrough, createNode),
  p: P(passThrough, createNode),
  'def-list': DefList(passThrough, createNode),
  'def-item': DefItem(passThrough, createNode),
  term: Term(passThrough, createNode),
  def: Def(passThrough, createNode),
  app: App(passThrough, createNode),
  statement: Statement(passThrough, createNode),
  secheading: SecHeading(passThrough, createNode),
  'sec-meta': SecMeta(recurseTheDom, createNode),
  graphic: Graphic(createNode),
  img: Img(createNode),
  fig: Fig(passThrough, createNode),
  caption: Caption(passThrough, createNode),
  toc: Toc(recurseTheDom, createNode),
  'toc-entry': TocEntry(recurseTheDom, passThrough, createNode),
  'inline-formula': Formula(passThrough, createNode),
  text: Text(passThrough),
  'ext-link': ExtLink(recurseTheDom, passThrough, createNode),
  break: Break(createNode),
  target: Target(passThrough, createNode),
  'boxed-text': BoxedText(passThrough, createNode),
  table: Table(createNode, copyElement),
  underline: Underline(passThrough, createNode),
  'disp-formula-group': DispFormulaGroup(passThrough, createNode),
  'simpletabbing': SimpleTabbing(passThrough, createNode),
  line: Line(passThrough, createNode),
  'subj-group': SubjGroup(recurseTheDom, createNode),
  'subject': Subject(passThrough, createNode),
  'monospace': Monospace(passThrough, createNode),
  'roman': Roman(passThrough, createNode),
  'sans-serif': SansSerif(passThrough, createNode),
  'sc': Sc(passThrough, createNode),
};

// other mappings

const mapTag = (func, newtag) => (elementProcessor[newtag] = func);

mapTag(elementProcessor['primary'], 'secondary');
mapTag(elementProcessor['p'], 'funding-statement');
mapTag(elementProcessor['graphic'], 'inline-graphic');
mapTag(elementProcessor['inline-formula'], 'disp-formula');
mapTag(elementProcessor['label'], 'title');
['ack', 'front-matter-part', 'dedication', 'book-app-group', 'book-app'].forEach(
  mapTag.bind(null, elementProcessor['sec'])
);
['fig-group', 'verse-group'].forEach(
  mapTag.bind(null, elementProcessor['fig'])
);

[
  'sup',
  'sub',
  'tbody',
  'thead',
  'th',
  'tr',
  'td',
  'pre',
  'hr',
].forEach(mapTag.bind(null, copyElement));

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
  'app-group',
  'book-title-group',
].forEach(mapTag.bind(null, passThrough));

export default (htmldom) => {
  htmldoc = htmldom;
  return recurseTheDom;
};
