import Preface from './elements/preface.js';
import BookMeta from './elements/book-meta.js';
import BookTitle from './elements/book-title.js';
import Subtitle from './elements/subtitle.js';
import ContribGroup from './elements/contrib-group.js';
import Contrib from './elements/contrib.js';
import Email from './elements/email.js';
import Xref from './elements/xref.js';
import X from './elements/x.js';
import Uri from './elements/uri.js';
import ContribId from './elements/contrib-id.js';
import RefList from './elements/ref-list.js';
import Ref from './elements/ref.js';
import MixedCitation from './elements/mixed-citation.js';
import Label from './elements/label.js';
import StringName from './elements/string-name.js';
import CopyrightStatement from './elements/copyright-statement.js';
import Article from './elements/article.js';
import ArticleTitle from './elements/article-title.js';
import ArticleMeta from './elements/article-meta.js';
import Msc from './elements/msc.js';
import MscKey from './elements/mscKey.js';
import KwdGroup from './elements/kwd-group.js';
import Kwd from './elements/kwd.js';
import FundingGroup from './elements/funding-group.js';
import MetaName from './elements/meta-name.js';
import MetaValue from './elements/meta-value.js';
import JournalMeta from './elements/journal-meta.js';
import PubDate from './elements/pub-date.js';
import SelfUri from './elements/self-uri.js';
import ArticleId from './elements/article-id.js';
import ArticleCitation from './elements/article-citation.js';
import Notes from './elements/notes.js';
import Abstract from './elements/abstract.js';
import Sec from './elements/sec.js';
import StyledContent from './elements/styled-content.js';
import Italic from './elements/italic.js';
import Bold from './elements/bold.js';
import DispQuote from './elements/disp-quote.js';
import Attrib from './elements/attrib.js';
import Fn from './elements/fn.js';
import P from './elements/p.js';
import DefList from './elements/def-list.js';
import DefItem from './elements/def-item.js';
import Term from './elements/term.js';
import Def from './elements/def.js';
import App from './elements/app.js';
import Statement from './elements/statement.js';
import SecHeading from './elements/sec-heading.js';
import SecMeta from './elements/sec-meta.js';
import Graphic from './elements/graphic.js';
import Img from './elements/img.js';
import Fig from './elements/fig.js';
import Caption from './elements/caption.js';
import Toc from './elements/toc.js';
import TocEntry from './elements/toc-entry.js';
import Formula from './elements/formula.js';
import Text from './elements/text.js';
import ExtLink from './elements/ext-link.js';
import Break from './elements/break.js';
import Target from './elements/target.js';
import BoxedText from './elements/boxed-text.js';
import Table from './elements/table.js';
import Underline from './elements/underline.js';
import DispFormulaGroup from './elements/disp-formula-group.js';
import SimpleTabbing from './elements/simpletabbing.js';
import Line from './elements/line.js';
import SubjGroup from './elements/subj-group.js';
import Subject from './elements/subject.js';
import Monospace from './elements/monospace.js';
import Roman from './elements/roman.js';
import SansSerif from './elements/sans-serif.js';
import Sc from './elements/sc.js';

import copyElement from './helpers/copyElement.js';


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
