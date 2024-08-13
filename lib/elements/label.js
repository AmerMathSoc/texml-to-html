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

import getParentLevel from '../helpers/getParentLevel.js';

/**
 * label and title elements. If both are present, expects label+title (not title+label)
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  // simple cases
  // CASE fn
  if (xmlnode.parentNode.tagName === 'fn') {
    const span = this.createNode('span', '<sup></sup>', {
      'data-ams-doc': 'label'
    });
    htmlParentNode.appendChild(span);
    const superscript = span.firstElementChild;
    this.passThrough(superscript, xmlnode);
    return;
  }
  // CASE label followed by a title -- we skip (and pull in the label later on when processing title)
  if (xmlnode.nextElementSibling?.tagName === 'title') return;
  // CASE empty label
  if (xmlnode.tagName === 'label' && xmlnode.innerHTML.trim() === '') return;

  // complex cases

  // Decide container (h* or figcaption; wrapping header for subtitles)
  const isStatement = xmlnode.parentNode.tagName === 'statement';
  const isDispFormulaGroup = xmlnode.parentNode.tagName === 'disp-formula-group';
  const level = getParentLevel(htmlParentNode) + 1;
  const container = (isStatement || isDispFormulaGroup) ? this.createNode('figcaption', '') : this.createNode(`h${level}`, '');
  htmlParentNode.appendChild(container);

  // subtitle handling (assumes container is not figcaption)
  const subtitleSibling = xmlnode.parentNode.querySelector(':scope>subtitle');
  if (subtitleSibling && subtitleSibling.innerHTML.trim() !== '') {
    // wrap heading in header
    const header = this.createNode('header');
    htmlParentNode.appendChild(header);
    header.appendChild(container);
    // recurse subtitle
    this.recurseTheDom(header, subtitleSibling);
  }

  // Pull in label (if title+label and we're processing title)
  const previousSibling = xmlnode.previousElementSibling;
  if (previousSibling?.tagName === 'label' && previousSibling.innerHTML.trim() !== '') {
    const labelSpan = this.createNode('span', '', { 'data-ams-doc': 'label' });
    container.appendChild(labelSpan);
    this.passThrough(labelSpan, previousSibling);
    labelSpan.insertAdjacentText('afterend', ' '); // NOTE: adding (in HTML meaningful) space after label & before title to avoid them from smashing together.
  }

  // CASE Book
  const altTitle = xmlnode.parentNode.querySelector(':scope>alt-title');
  const hasAltTitle = altTitle && altTitle.innerHTML !== xmlnode.innerHTML;
  if (this.isBook && hasAltTitle) {
    container.setAttribute('data-ams-doc-alttitle', container.textContent + altTitle.innerHTML); // NOTE assumes previousSibling handled first
  }

  // add main node and recurse
  const actualSpan = this.createNode('span', '', { 'data-ams-doc':  xmlnode.tagName });
  container.appendChild(actualSpan);
  // NOTE: no space after title/label if there's only one. Downstream might insert some (e.g., with inlined headings).
  this.passThrough(actualSpan, xmlnode);
};
