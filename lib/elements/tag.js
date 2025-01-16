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

import { node2macro, } from '../helpers/helpers-tex.js';

/**
 * tag element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
    // usually, tag appears inside tex-math
    if (xmlnode.closest('tex-math')) {
        // rewrite to macro
        const macroName = (xmlnode.getAttribute('parens') === 'yes') ? 'tag' : 'tag*';
        node2macro.apply(this, [htmlParentNode, xmlnode, macroName]);

        // tag extraction
        // if some tag in the equation is linked, we store all tags as part of a JSON array in the data-ams-tag attribute on the HTML parent
        if (!xmlnode.closest('disp-formula').querySelector('target tag')) return;
        const tagArray = htmlParentNode.hasAttribute('data-ams-tags') ? JSON.parse(htmlParentNode.getAttribute('data-ams-tags')) : [];
        tagArray.push(this.passthroughIntoHTMLString(xmlnode)); // NOTE we only need passThroughIntoHTMLString here, i.e., we don't need to escape active TeX characters, because node2macro already ran and modified xmlnode
        htmlParentNode.setAttribute('data-ams-tags', JSON.stringify(tagArray));
    }
    // rarely, it appears in "text equations" (cf. formula.js, target.js)
    else if (xmlnode.closest('disp-formula[content-type="text"]')) {
        const span = this.createNode('span', '', { 'data-ams-doc': 'label'});
        if (xmlnode.getAttribute('parens') === 'yes') span.insertAdjacentText('afterbegin', '(')
        this.passThrough(span, xmlnode);
        if (xmlnode.getAttribute('parens') === 'yes') span.insertAdjacentText('beforeend', ')')
        htmlParentNode.prepend(span); //NOTE: we prepend to get left-side tags even when there is no target; but cf. AmerMathSoc/texml#232 
    }
    // tag extraction 
    // if some tag in the equation is linked, we store all tags in a special element in the HTML parent
    const tagsElement = htmlParentNode.closest('[data-ams-doc~="math"]').firstElementChild;
    if (tagsElement?.getAttribute('data-ams-doc') === 'tags') tagsElement.insertAdjacentHTML('beforeend', `<span>${this.passthroughIntoHTMLString(xmlnode.cloneNode(true))}</span>`);
};
