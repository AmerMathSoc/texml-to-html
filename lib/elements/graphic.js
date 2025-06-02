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

import path from 'path';

/**
 * graphic and inline-graphic element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const filename = xmlnode.getAttribute('xlink:href');
  // texml sometimes generates unitless dimensions; we add px then
  let width = xmlnode.getAttribute('width');
  if (width.search(/[^0-9]/) === -1) width = width + 'px';
  let height = xmlnode.getAttribute('height');
  if (height.search(/[^0-9]/) === -1) height = height + 'px';
  const alttext = this.imageAltDictionary[path.basename(filename)] || 'Graphic without alt text';
  if (xmlnode.closest('tex-math')) {
    htmlParentNode.insertAdjacentText('beforeend', `\\vcenter{\\img[][${width}][${height}][{${alttext}}]{${filename}}}`);
    return;
  }
  const img = this.createNode('img', '', {
    'data-ams-doc': xmlnode.tagName,
    src: filename,
    'data-ams-style': xmlnode.getAttribute('specific-use'),
    'data-ams-width': width,
    'data-ams-height': height,
    alt: alttext
  });
  htmlParentNode.appendChild(img);
  if (xmlnode.parentNode.tagName !== 'fig') return;
  const altText = xmlnode.querySelector('alt-text');
  if (altText) img.setAttribute('alt', altText.textContent);
};
