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
 * toc element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const nav = this.createNode('nav', '', {
    role: 'doc-toc',
    'data-ams-doc-level': '0',
    id: xmlnode.id,
  });
  htmlParentNode.appendChild(nav);
  this.recurseTheDom(nav, xmlnode.querySelector('title-group'));
  const ol = this.createNode('ol');
  nav.appendChild(ol);
  [...xmlnode.childNodes]
    .filter((node) => node.tagName === 'toc-entry')
    .forEach(this.recurseTheDom.bind(null, ol));
};
