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
 * inline-formula and disp-formula element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  // unwrap nested formula elements and return; cf. tex-math.js
  if (xmlnode.parentNode.closest('tex-math')) {
    this.passThrough(htmlParentNode, xmlnode);
    return;
  }
  if (xmlnode.getAttribute('content-type') === 'text') {
    const div = this.createNode('div', '', {
      'data-ams-doc': `math text`
    });
    htmlParentNode.appendChild(div);
    this.passThrough(div, xmlnode);
    return
  }
  // Otherwise
  const mathMode = xmlnode.tagName === 'inline-formula' ? 'inline' : 'block';
  const span = this.createNode('span', '', {
    'data-ams-doc': `math ${mathMode}`
  });
  htmlParentNode.appendChild(span);
  const hasLinkedTag = xmlnode.querySelector('target tag');
  const tagContainer = `<span hidden data-ams-doc="tags"></span>`; //NOTE we store copies of tags for easier re-use downstream (cf. tags.js) except for text equations
  if (hasLinkedTag) span.insertAdjacentHTML('afterbegin', tagContainer)
  if (mathMode === 'block' && xmlnode.querySelector('tex-math[has-qed-box]'))
    span.setAttribute('data-ams-qed-box', 'true');
  this.passThrough(span, xmlnode);
  // NOTE we (sometimes?) get extra whitespace from childnodes; needs test
  const text = span.innerHTML;
  span.innerHTML = text.replace(/[ \n]+/g, ' ');
};
