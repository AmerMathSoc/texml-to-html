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
 * mixed-citation element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const dd = this.createNode('dd');
  htmlParentNode.appendChild(dd);
  const div = this.createNode('div', '', { 'data-ams-doc': 'biblioentry' });
  dd.appendChild(div);
  // NOTE xslt would map attributes but we have no content with attributes on mixed-citations
  this.passThrough(div, xmlnode);
  const rawCitation = xmlnode.parentNode.querySelector('raw-citation');
  if (!rawCitation) return;
  const code = this.createNode('code', rawCitation.innerHTML, {
    'data-ams-doc': 'amsref'
  });
  div.appendChild(code);
};
