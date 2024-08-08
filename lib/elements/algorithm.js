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
 * alg:algorithm element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export function alg(htmlParentNode, xmlnode) {
    const node = this.createNode('alg-algorithm');
    if (xmlnode.getAttribute('linenodelimiter')) node.setAttribute('data-ams-alg-linenodelimiter', xmlnode.getAttribute('linenodelimiter'));
    htmlParentNode.appendChild(node);
    this.passThrough(node, xmlnode);
};

/**
 * alg:line element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export function algLine(htmlParentNode, xmlnode) {
    const spansLineNo = ['alg:require', 'alg:ensure'].includes(xmlnode.firstElementChild.tagName); // NOTE if texml generated a suitable attribute, we wouldn't need an allowlist
    const lineNo = this.createNode('alg-lineno');
    htmlParentNode.appendChild(lineNo);
    if (!spansLineNo && xmlnode.getAttribute('lineno')) lineNo.innerHTML = `${xmlnode.getAttribute('lineno')}${xmlnode.closest('[linenodelimiter]')?.getAttribute('linenodelimiter') || ''}`;
    const node = this.createNode('alg-line');
    if (spansLineNo) node.setAttribute('data-ams-alg-spanslineno');
    htmlParentNode.appendChild(node);
    this.passThrough(node, xmlnode);
};

/**
 * alg:block element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export function algBlock(htmlParentNode, xmlnode) {
    const node = this.createNode('alg-block');
    const nestedLevel = htmlParentNode.closest('[data-ams-alg-blocklevel]') ? parseInt(htmlParentNode.closest('[data-ams-alg-blocklevel]').getAttribute('data-ams-alg-blocklevel')) + 1 : 1;
    node.setAttribute('data-ams-alg-blocklevel', nestedLevel);
    htmlParentNode.appendChild(node);
    this.passThrough(node, xmlnode);
};

/**
 * alg:statement element; also used for alg:require, alg:ensure, alg:globals
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export function algStatement(htmlParentNode, xmlnode) {
    const node = this.createNode('alg-statement');
    htmlParentNode.appendChild(node);
    this.passThrough(node, xmlnode);
};

/**
 * alg:comment element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export function algComment(htmlParentNode, xmlnode) {
    const node = this.createNode('alg-comment');
    htmlParentNode.appendChild(node);
    this.passThrough(node, xmlnode);
};
