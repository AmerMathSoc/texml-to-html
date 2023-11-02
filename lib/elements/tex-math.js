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
 * tex-math element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  // nested tex-math: unwrapped but with $...$
  if (xmlnode.parentNode.closest('tex-math')) {
    htmlParentNode.insertAdjacentText('beforeend', '$');
    this.passThrough(htmlParentNode, xmlnode);
    htmlParentNode.insertAdjacentText('beforeend', '$');
    return; // NOTE should only occur in implicit text mode (\tag{} // <tag /> etc) or within <text> elements (which are not JATS/BITS and thus occur nowhere else)
}
  // Otherwise we copy and pass-through
  const element = this.createNode('tex-math');
  htmlParentNode.appendChild(element);
  this.passThrough(element, xmlnode);
};
