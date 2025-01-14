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
 * statement element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const figure = this.createNode('figure', '', {
    'data-ams-doc': 'statement',
  });
  mapAttributes(figure, xmlnode);
  htmlParentNode.appendChild(figure);

  const label = xmlnode.querySelector(':scope>label:not(:empty)');
  const title = xmlnode.querySelector(':scope>title:not(:empty)');
  if (label || title) {
    const figcaption = this.createNode('figcaption');
    figure.appendChild(figcaption);
    this.redirectRecurseTheDom(figcaption, label);
    if (label && title) figcaption.insertAdjacentText('beforeend', ' ');
    this.redirectRecurseTheDom(figcaption, title);
  }

  this.passThrough(figure, xmlnode);
};
