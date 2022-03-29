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
    copyElement = copyElement.bind(this)

    // imported elements
    preface = Preface.bind(this)
    'book-meta' = BookMeta.bind(this)
    'book-title' = BookTitle.bind(this)
    subtitle = Subtitle.bind(this)
    'contrib-group' = ContribGroup.bind(this)
    contrib = Contrib.bind(this)
    email = Email.bind(this)
    xref = Xref.bind(this)
    x = X.bind(this)
    uri = Uri.bind(this)
    'contrib-id' = ContribId.bind(this)
    'ref-list' = RefList.bind(this)
    ref = Ref.bind(this)
    'mixed-citation' = MixedCitation.bind(this)
    label = Label.bind(this)
    'string-name' = StringName.bind(this)
    'copyright-statement' = CopyrightStatement.bind(this)
    article = Article.bind(this)
    'article-title' = ArticleTitle.bind(this)
    'article-meta' = ArticleMeta.bind(this)
    msc = Msc.bind(this)
    primary = MscKey.bind(this)
    'kwd-group' = KwdGroup.bind(this)
    kwd = Kwd.bind(this)
    'funding-group' = FundingGroup.bind(this)
    'meta-name' = MetaName.bind(this)
    'meta-value' = MetaValue.bind(this)
    'journal-meta' = JournalMeta.bind(this)
    'pub-date' = PubDate.bind(this)
    'self-uri' = SelfUri.bind(this)
    'article-id' = ArticleId.bind(this)
    'article-citation' = ArticleCitation.bind(this)
    notes = Notes.bind(this)
    abstract = Abstract.bind(this)
    sec = Sec.bind(this)
    'styled-content' = StyledContent.bind(this)
    italic = Italic.bind(this)
    bold = Bold.bind(this)
    'disp-quote' = DispQuote.bind(this)
    attrib = Attrib.bind(this)
    fn = Fn.bind(this)
    p = P.bind(this)
    'def-list' = DefList.bind(this)
    'def-item' = DefItem.bind(this)
    term = Term.bind(this)
    def = Def.bind(this)
    app = App.bind(this)
    statement = Statement.bind(this)
    secheading = SecHeading.bind(this)
    'sec-meta' = SecMeta.bind(this)
    graphic = Graphic.bind(this)
    img = Img.bind(this)
    fig = Fig.bind(this)
    caption = Caption.bind(this)
    toc = Toc.bind(this)
    'toc-entry' = TocEntry.bind(this)
    'inline-formula' = Formula.bind(this)
    text = Text.bind(this)
    'ext-link' = ExtLink.bind(this)
    break = Break.bind(this)
    target = Target.bind(this)
    'boxed-text' = BoxedText.bind(this)
    table = Table.bind(this)
    underline = Underline.bind(this)
    'disp-formula-group' = DispFormulaGroup.bind(this)
    simpletabbing = SimpleTabbing.bind(this)
    line = Line.bind(this)
    'subj-group' = SubjGroup.bind(this)
    subject = Subject.bind(this)
    monospace = Monospace.bind(this)
    roman = Roman.bind(this)
    'sans-serif' = SansSerif.bind(this)
    sc = Sc.bind(this)

    // one-off reuse of imported elements
    // NOTE if RHS gets re-used more than once, use mapTag in the constructor
    secondary = this['primary']
    'funding-statement' = this['p']
    'inline-graphic' = this['graphic']
    'disp-formula' = this['inline-formula']
    title = this['label']
}
