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

import mapAttributes from '../helpers/mapAttributes.js';

/**
 * Recursively check siblings of maybeBadAncestor node if they are footnotes (so as to insert after all earlier footnotes from the same maybeBadAncestor, i.e., keep order of footnotes correct).
 * 
 * @param {HTMLElement} maybeBadAncestor 
 * @returns {HTMLElement}
 */
const getElementToInsertAfter = maybeBadAncestor => (maybeBadAncestor.nextElementSibling && maybeBadAncestor.nextElementSibling.getAttribute('role') === 'doc-footnote') ? getElementToInsertAfter(maybeBadAncestor.nextElementSibling) : maybeBadAncestor;

/**
 * 
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  if (xmlnode.closest('tex-math')) xmlnode.remove();
  const label = xmlnode.querySelector('label');
  const div = this.createNode('div', '', { role: 'doc-footnote', 'aria-label': `Footnote ${label.textContent}` });
  // NOTE AmerMathSoc/texml-to-html#336 analyzed where fn occurs in publications; might need revisions
  // Essentially, we can assume fn occurs inside elements (that turn into) p, h1, and span (from formula markup)
  // Since a span ancestor can be inside p (e.g., from inline-formula) we check for the others first.
  const maybeBadAncestor = htmlParentNode.closest('p, h1') || htmlParentNode.closest('span');
  maybeBadAncestor ? getElementToInsertAfter(maybeBadAncestor).insertAdjacentElement('afterend', div) : htmlParentNode.appendChild(div);
  mapAttributes(div, xmlnode);
  // label
  const span = this.createNode('span', '<sup></sup>', {
    'data-ams-doc': 'label'
  });
  div.appendChild(span);
  const superscript = span.firstElementChild;
  this.passThrough(superscript, label);
  label.remove(); //NOTE: prevent duplicate processing later on

  this.passThrough(div, xmlnode);
};
