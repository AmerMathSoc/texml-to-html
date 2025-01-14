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
 * secheading element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const parentLevel = htmlParentNode.closest('[data-ams-doc-level]')?.getAttribute('data-ams-doc-level') || 5;
  const span = this.createNode('span', '', {
    'data-ams-doc': 'secheading',
    'data-ams-doc-level': parseInt(parentLevel) + 1,
  });
  mapAttributes(span, xmlnode);

  htmlParentNode.appendChild(span);
  // NOTE: secheadings are re-written to headings downstream so we keep them flat here
  const label = xmlnode.querySelector('label');
  const title = xmlnode.querySelector('title');
  if (label) {
    this.passThrough(span, label);
    if (title) span.insertAdjacentText('beforeend', ' ');
  }
  if (!title) return;
  this.passThrough(span, title);
};
