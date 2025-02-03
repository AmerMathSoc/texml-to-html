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
 * disp-quote element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const specificUse = xmlnode.getAttribute('specific-use');
  const contentType = xmlnode.getAttribute('content-type');
  const blockquote = this.createNode('blockquote');
  if (contentType === 'epigraph')
    blockquote.setAttribute('role', 'doc-epigraph');
  else blockquote.setAttribute('data-ams-style', specificUse);
  htmlParentNode.appendChild(blockquote);
  // handle attrib
  const attrib = xmlnode.querySelector(':scope>attrib');
  const footer = this.createNode('footer');
  if (attrib) this.redirectRecurseTheDom(footer, attrib);
  this.passThrough(blockquote, xmlnode);
  if (attrib) blockquote.appendChild(footer);
};
