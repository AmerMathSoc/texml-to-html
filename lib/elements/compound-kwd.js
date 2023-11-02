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
 * compound-kwd element
 * NOTE: left in document because compound-kwd-part[content-type="text"] can contain tex-math
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const li = this.createNode('li', '', { 'data-msc-role': xmlnode.getAttribute('content-type'), 'data-msc-key': xmlnode.querySelector('compound-kwd-part[content-type="code"]').textContent });
  htmlParentNode.appendChild(li);
  this.passThrough(li, xmlnode.querySelector('compound-kwd-part[content-type="text"]'));
};
