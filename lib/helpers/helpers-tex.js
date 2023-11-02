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

/**
 * Re-escape active TeX characters inside text node (since we create TeX input for mathjax from <text> elements)
 * @param {Text} textNode 
 */
const replaceTeXCharactersInNode = textNode => {
    const regExp = /([#$_&])/g;
    textNode.textContent = textNode.textContent.replace(regExp, '\\$1').replace('~','\\unicode{x7E}');
}

/**
 * Runs replaceTeXCharactersInNode on all text node (direct) children
 * @param {Node} xmlnode 
 */
export const replaceTeXCharactersInNodes = (xmlnode) => {
    const textChildren = [...xmlnode.childNodes].filter(node => node.nodeType === 3);
    textChildren.forEach(replaceTeXCharactersInNode)
}


/**
 * Common pattern for handling most xml nodes when inside tex-math:
 * - create provided TeX macro
 * - maybe replaces active characters in xmlnode
 * - maybe wraps in $...$
 * - runs pass through
 * @param {HTMLElement} htmlParentNode - html container for resulting output
 * @param {Node} xmlnode - an xml node inside tex-math
 * @param {String} macroName - name of TeX macro
 * @param {Boolean} needsEscaping - decide if active TeX characters need escaping
 * @param {Boolean} needsDollars - decide if active TeX characters need escaping
 */
export function node2macro(htmlParentNode, xmlnode, macroName, needsEscaping, needsDollars) {
    const maybeDollar = needsDollars ? '$' : '';
    htmlParentNode.insertAdjacentText('beforeend', `${maybeDollar}\\${macroName}{`);
    if (needsEscaping) replaceTeXCharactersInNodes(xmlnode);
    this.passThrough(htmlParentNode, xmlnode);
    htmlParentNode.insertAdjacentText('beforeend', `}${maybeDollar}`);
}
