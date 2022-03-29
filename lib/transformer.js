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

import copyElement from './copyElement.js';


export class Transformer {
    constructor(htmldoc) {
        // the HTML document
        this.htmldoc = htmldoc;

        // helper mapping elements to existing methods
        const mapTag = (func, newtag) => (this[newtag] = func);

        // sec-like elements
        ['ack', 'front-matter-part', 'dedication', 'book-app-group', 'book-app'].forEach(
            mapTag.bind(null, this['sec'])
        );
        // fig-like elements
        ['fig-group', 'verse-group'].forEach(
            mapTag.bind(null, this['fig'])
        );
        // copyable elements
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
        ].forEach(mapTag.bind(null, this.copyElement));
        // passThrough elements
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
        ].forEach(mapTag.bind(null, this.passThrough));
    }

    createNode = (tagname, content, properties) => {
        if (!properties) properties = {};
        const node = this.htmldoc.createElement(tagname);
        if (content) node.innerHTML = content;
        for (let prop of Object.keys(properties))
            node.setAttribute(prop, properties[prop]);
        return node;
    };

    recurseTheDom = (htmlParentNode, xmlnode) => {
        if (!xmlnode) return;
        if (xmlnode.nodeType === 3)
            htmlParentNode.appendChild(this.htmldoc.importNode(xmlnode, false));
        if (xmlnode.nodeType !== 1) return;
        if (this[xmlnode.tagName]) this[xmlnode.tagName](htmlParentNode, xmlnode);
        // else we drop/ignore the node
    };

    // pass through elements
    passThrough = (htmlParentNode, xmlnode) => {
        if (!xmlnode) return;
        xmlnode.childNodes.forEach(this.recurseTheDom.bind(null, htmlParentNode));
    };

    // copy elements helper
    copyElement = copyElement(this.passThrough, this.createNode)

    // imported elements
    preface = Preface(this.passThrough, this.createNode)
    'book-meta' = BookMeta(this.recurseTheDom, this.passThrough, this.createNode)
    'book-title' = BookTitle(this.passThrough, this.createNode)
    subtitle = Subtitle(this.passThrough, this.createNode)
    'contrib-group' = ContribGroup(this.passThrough, this.createNode)
    contrib = Contrib(this.recurseTheDom, this.passThrough, this.createNode)
    email = Email(this.createNode)
    xref = Xref(this.recurseTheDom, this.passThrough, this.createNode)
    x = X(this.passThrough)
    uri = Uri(this.createNode)
    'contrib-id' = ContribId(this.createNode)
    'ref-list' = RefList(this.recurseTheDom, this.passThrough, this.createNode)
    ref = Ref(this.recurseTheDom, this.createNode)
    'mixed-citation' = MixedCitation(this.passThrough, this.createNode)
    label = Label(this.recurseTheDom, this.passThrough, this.createNode)
    'string-name' = StringName(this.passThrough, this.createNode)
    'copyright-statement' = CopyrightStatement(this.passThrough, this.createNode)
    article = Article(this.recurseTheDom, this.passThrough, this.createNode)
    'article-title' = ArticleTitle(this.passThrough, this.createNode)
    'article-meta' = ArticleMeta(this.recurseTheDom, this.createNode)
    msc = Msc(this.recurseTheDom, this.createNode)
    primary = MscKey(this.passThrough, this.createNode)
    'kwd-group' = KwdGroup(this.passThrough, this.createNode)
    kwd = Kwd(this.passThrough, this.createNode)
    'funding-group' = FundingGroup(this.passThrough, this.createNode)
    'meta-name' = MetaName(this.passThrough, this.createNode)
    'meta-value' = MetaValue(this.passThrough, this.createNode)
    'journal-meta' = JournalMeta(this.createNode)
    'pub-date' = PubDate(this.createNode)
    'self-uri' = SelfUri(this.createNode)
    'article-id' = ArticleId(this.createNode)
    'article-citation' = ArticleCitation(this.createNode)
    notes = Notes(this.passThrough, this.createNode)
    abstract = Abstract(this.passThrough, this.createNode)
    sec = Sec(this.passThrough, this.createNode)
    'styled-content' = StyledContent(this.passThrough, this.createNode)
    italic = Italic(this.passThrough, this.createNode)
    bold = Bold(this.passThrough, this.createNode)
    'disp-quote' = DispQuote(this.passThrough, this.createNode)
    attrib = Attrib(this.passThrough, this.createNode)
    fn = Fn(this.passThrough, this.createNode)
    p = P(this.passThrough, this.createNode)
    'def-list' = DefList(this.passThrough, this.createNode)
    'def-item' = DefItem(this.passThrough, this.createNode)
    term = Term(this.passThrough, this.createNode)
    def = Def(this.passThrough, this.createNode)
    app = App(this.passThrough, this.createNode)
    statement = Statement(this.passThrough, this.createNode)
    secheading = SecHeading(this.passThrough, this.createNode)
    'sec-meta' = SecMeta(this.recurseTheDom, this.createNode)
    graphic = Graphic(this.createNode)
    img = Img(this.createNode)
    fig = Fig(this.passThrough, this.createNode)
    caption = Caption(this.passThrough, this.createNode)
    toc = Toc(this.recurseTheDom, this.createNode)
    'toc-entry' = TocEntry(this.recurseTheDom, this.passThrough, this.createNode)
    'inline-formula' = Formula(this.passThrough, this.createNode)
    text = Text(this.passThrough)
    'ext-link' = ExtLink(this.recurseTheDom, this.passThrough, this.createNode)
    break = Break(this.createNode)
    target = Target(this.passThrough, this.createNode)
    'boxed-text' = BoxedText(this.passThrough, this.createNode)
    table = Table(this.createNode, this.copyElement)
    underline = Underline(this.passThrough, this.createNode)
    'disp-formula-group' = DispFormulaGroup(this.passThrough, this.createNode)
    simpletabbing = SimpleTabbing(this.passThrough, this.createNode)
    line = Line(this.passThrough, this.createNode)
    'subj-group' = SubjGroup(this.recurseTheDom, this.createNode)
    subject = Subject(this.passThrough, this.createNode)
    monospace = Monospace(this.passThrough, this.createNode)
    roman = Roman(this.passThrough, this.createNode)
    'sans-serif' = SansSerif(this.passThrough, this.createNode)
    sc = Sc(this.passThrough, this.createNode)

    // one-off reuse of imported elements
    // NOTE if RHS gets re-used more than once, use mapTag in the constructor
    secondary = this['primary']
    'funding-statement' = this['p']
    'inline-graphic' = this['graphic']
    'disp-formula' = this['inline-formula']
    title = this['label']
}
