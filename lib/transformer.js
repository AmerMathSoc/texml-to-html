/*!
 *  Copyright (c) 2023 American Mathematical Society
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import Front from './elements/front.js';
import Preface from './elements/preface.js';
import BookMeta from './elements/book-meta.js';
import Subtitle from './elements/subtitle.js';
import Email from './elements/email.js';
import Xref from './elements/xref.js';
import X from './elements/x.js';
import RefList from './elements/ref-list.js';
import Ref from './elements/ref.js';
import MixedCitation from './elements/mixed-citation.js';
import Label from './elements/label.js';
import StringName from './elements/string-name.js';
import Article from './elements/article.js';
import KwdGroup from './elements/kwd-group.js';
import Kwd from './elements/kwd.js';
import CompoundKwd from './elements/compound-kwd.js';
import FundingGroup from './elements/funding-group.js';
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
import SecHeading from './elements/secheading.js';
import SecMeta from './elements/sec-meta.js';
import Graphic from './elements/graphic.js';
import Img from './elements/img.js';
import Fig from './elements/fig.js';
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
import Monospace from './elements/monospace.js';
import Roman from './elements/roman.js';
import SansSerif from './elements/sans-serif.js';
import Sc from './elements/sc.js';
import * as algorithm from './elements/algorithm.js';
import Tag from './elements/tag.js';
import Xrefgroup from './elements/xref-group.js';
import TexMath from './elements/tex-math.js';
import CiteGroup from './elements/cite-group.js';
import CiteDetail from './elements/cite-detail.js';
import TitleGroup from './elements/title-group.js';

import copyElement from './helpers/copyElement.js';
import { extractContribGroups } from './helpers/extractContribGroups.js';
import getParentLevel from './helpers/getParentLevel.js';

/**
 * The Transformer class
 */
export class Transformer {
    /**
     * 
     * @param {Document} htmldoc - HTML document
     * @param {Object} imageAltDictionary - Key value store with file names and alt text strings
     * @param {Boolean} isBook - Boolean to indicate if we are transforming a book
     */
    constructor(htmldoc, imageAltDictionary, isBook) {
        // the HTML document
        this.htmldoc = htmldoc;

        // the image alt lookup table
        this.imageAltDictionary = imageAltDictionary;

        // book check
        this.isBook = isBook;

        // helper mapping elements to existing methods
        const mapTag = (func, newtag) => (this[newtag] = func);

        // sec-like elements
        ['ack', 'front-matter-part', 'dedication', 'book-app-group', 'book-app'].forEach(
            mapTag.bind(null, this['sec'])
        );
        // fig-like elements
        ['fig-group', 'verse-group', 'table-wrap', 'table-wrap-group'].forEach(
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
            'back',
            'alternatives',
            'app-group',
            'book-title-group',
            'private-char',
            'article-title' // NOTE: maybe map to label (like title)
        ].forEach(mapTag.bind(null, this.passThrough));
    }

    /**
     * 
     * @param {String} tagname - a tag name to create node with
     * @param {String} content  - content added to the tag's innerHTML
     * @param {Object} properties  - Object of attribute / value keys
     * @returns {HTMLElement} - node with tagname, content and attributes
     */
    createNode = (tagname, content, properties = {}) => {
        const node = this.htmldoc.createElement(tagname);
        if (content) node.innerHTML = content;
        for (let prop of Object.keys(properties))
            node.setAttribute(prop, properties[prop]);
        return node;
    };
    /**
     * Main (recursive) step - adds cloned text node or recurses into children
     * @param {Node} htmlParentNode - HTML "parent" for xmlnode content
     * @param {Node} xmlnode - XML node (to possibly recurse into)
     * @returns {undefined}
     */
    recurseTheDom = (htmlParentNode, xmlnode) => {
        if (!xmlnode) return;
        if (xmlnode.nodeType === 3)
            htmlParentNode.appendChild(this.htmldoc.importNode(xmlnode, false));
        if (xmlnode.nodeType !== 1) return;
        if (this[xmlnode.tagName]) this[xmlnode.tagName](htmlParentNode, xmlnode);
        // else we drop/ignore the node
    };

    /**
     * Function to "redirect" the recursion.
     * @param {Node} htmlParentNode - HTML "parent" for xmlnode content
     * @param {Node} xmlnode - XML node to recurse with a different parent and detach afterwards
     * @returns {undefined}
     */
    redirectRecurseTheDom = (htmlParentNode, xmlnode) => {
        this.recurseTheDom(htmlParentNode, xmlnode);
        xmlnode?.remove(); // NOTE: falsy handling; matches recurseTheDom
    };

    /**
     * Pass-through function (for xmlnode that we "unwrap")
     * @param {Node} htmlParentNode - HTML "parent" for xmlnode content
     * @param {Node} xmlnode - XML node to unwrap
     * @returns {undefined}
     */
    passThrough = (htmlParentNode, xmlnode) => {
        if (!xmlnode) return;
        xmlnode.childNodes.forEach(this.recurseTheDom.bind(null, htmlParentNode));
    };

    /**
     * Pass through hack for metadata generation
     * @param {Node} xmlnode
     * @returns {String}
     */
    passthroughIntoHTMLString = xmlnode => {
        const span = this.createNode('span');
        this.passThrough(span, xmlnode);
        return span.innerHTML.trim();
    }
    
    createHeading = (section, xmlnode)  => {  // create heading structure
        const label = xmlnode.querySelector(':scope>label:not(:empty)');
        const title = xmlnode.querySelector(':scope>title:not(:empty), :scope>article-title:not(:empty)');
        const subtitle = xmlnode.querySelector(':scope>subtitle:not(:empty)');
        const altTitle = xmlnode.querySelector(':scope>alt-title:not(:empty)');
      
        const level = getParentLevel(section) + 1 || 1;

        const heading = this.createNode(`h${level}`);
        if (label || title) section.appendChild(heading);
      
        this.redirectRecurseTheDom(heading, label);
      
        if (label&&title) heading.insertAdjacentText('beforeend', ' '); // NOTE: adding (in HTML meaningful) space after label & before title to avoid them from smashing together.
      
        if (this.isBook && altTitle) heading.setAttribute('data-ams-doc-alttitle', heading.textContent + altTitle.innerHTML); // NOTE placed between label and title handling so that the result includes label content (but cf. #464)
      
        this.redirectRecurseTheDom(heading, title);
      
        if (subtitle) {
          const header = this.createNode('header');
          section.appendChild(header);
          header.appendChild(heading);
          this.redirectRecurseTheDom(header, subtitle);
        }
      
      }

    // extract contrib-groups into json data
    extractContribGroups = extractContribGroups.bind(this);

    // copy elements helper
    copyElement = copyElement.bind(this)

    // imported elements
    front = Front.bind(this)
    preface = Preface.bind(this)
    'book-meta' = BookMeta.bind(this)
    subtitle = Subtitle.bind(this)
    email = Email.bind(this)
    xref = Xref.bind(this)
    x = X.bind(this)
    'ref-list' = RefList.bind(this)
    ref = Ref.bind(this)
    'mixed-citation' = MixedCitation.bind(this)
    label = Label.bind(this)
    'string-name' = StringName.bind(this)
    article = Article.bind(this)
    'kwd-group' = KwdGroup.bind(this)
    kwd = Kwd.bind(this)
    'compound-kwd' = CompoundKwd.bind(this)
    'funding-group' = FundingGroup.bind(this)
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
    monospace = Monospace.bind(this)
    roman = Roman.bind(this)
    'sans-serif' = SansSerif.bind(this)
    sc = Sc.bind(this)
    tag = Tag.bind(this)
    'xref-group' = Xrefgroup.bind(this)
    'tex-math' = TexMath.bind(this)
    'cite-group' = CiteGroup.bind(this)
    'cite-detail' = CiteDetail.bind(this)
    'title-group' = TitleGroup.bind(this)

    // one-off reuse of imported elements
    // NOTE if RHS gets re-used more than once, use mapTag in the constructor
    'funding-statement' = this['p']
    'inline-graphic' = this['graphic']
    'disp-formula' = this['inline-formula']
    title = this['label']

    // algorithm layout
    'alg:algorithm' = algorithm.alg;
    'alg:line' = algorithm.algLine;
    'alg:block' = algorithm.algBlock;
    'alg:statement' = algorithm.algStatement;
    'alg:comment' = algorithm.algComment;
    // remapped alg:* elements
    'alg:require' = algorithm.algStatement;
    'alg:ensure' = algorithm.algStatement;
    'alg:globals' = algorithm.algStatement;
    // pass-through alg:* elements
    'alg:body' = this.passThrough; // NOTE no test (case)
    'alg:outputs' = this.passThrough; // NOTE no test (case)
    'alg:inputs' = this.passThrough; // NOTE no test (case)
    'alg:condition' = this.passThrough;
    'alg:if' = this.passThrough;
    'alg:elsif' = this.passThrough; // NOTE no test (case)
    'alg:else' = this.passThrough;
    'alg:for' = this.passThrough;
    'alg:forall' = this.passThrough; // NOTE no test (case)
    'alg:while' = this.passThrough; // NOTE no test (case)
    'alg:repeat' = this.passThrough; // NOTE no test (case)
    'alg:until' = this.passThrough; // NOTE no test (case)
    'alg:loop' = this.passThrough; // NOTE no test (case)
    'alg:function' = this.passThrough;
    'alg:procedure' = this.passThrough;
}
