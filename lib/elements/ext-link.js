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

import { node2macro } from '../helpers/helpers-tex.js';

/**
 * ext-link element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  if (xmlnode.closest('tex-math')) {
    node2macro.apply(this, [htmlParentNode, xmlnode, `href{${xmlnode.getAttribute('xlink:href')}}`, true]); // NOTE href works in both math and text mode; `\href`'s first argument does not need escaping
    return;
  }
  const isNestedLink = htmlParentNode.closest('a');
  if (isNestedLink) console.log('Warning: texml-to-html: Nested ext-link', xmlnode.outerHTML);
  const anchor = isNestedLink ?
    this.createNode('span', '', {
      'data-ams-href': xmlnode.getAttribute('xlink:href')
    })
    : this.createNode('a', '', {
      href: xmlnode.getAttribute('xlink:href')
    });
  htmlParentNode.appendChild(anchor);

  this.passThrough(anchor, xmlnode);
};
