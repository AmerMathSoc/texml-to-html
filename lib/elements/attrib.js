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
 * attrib element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  let actualParent = htmlParentNode;
  if (xmlnode.parentNode.tagName === 'disp-quote') {
    const footer = this.createNode('footer');
    htmlParentNode.appendChild(footer);
    actualParent = footer;
  }
  if (
    xmlnode.parentNode.tagName === 'fig' ||
    xmlnode.parentNode.tagName === 'fig-group'
  ) {
    // NOTE there should be a figcaption element (cf. caption())
    // NOTE so far this only occurs in mbk103, clrm067 to attribute graphics in figures
    actualParent = htmlParentNode.querySelector(':scope>figcaption');
  }
  const span = this.createNode('span');
  actualParent.insertAdjacentText('beforeend', ' '); // NOTE needed inside fig-caption
  actualParent.appendChild(span);
  this.passThrough(span, xmlnode);
};
