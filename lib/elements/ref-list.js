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
import getParentLevel from '../helpers/getParentLevel.js';

/**
 * ref-list element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  // calculate document level
  const parentLevel = getParentLevel(htmlParentNode);
  let level = this.isBook ? '0' : '1';
  if (!Number.isNaN(parentLevel)) level = parentLevel + 1;
  // check nesting NOTE no complex nesting allowed.
  const isNestedRefList = (xmlnode.parentNode.tagName === 'ref-list');
  const containsRefList = xmlnode.querySelector(':scope>ref-list');
  // wrapping section to accomodate title
  const section = this.createNode('section', '', {
    'data-ams-doc-level': level
  });
  mapAttributes(section, xmlnode);
  htmlParentNode.appendChild(section);
  this.createHeading(section, xmlnode);
  if (!isNestedRefList) {
    section.setAttribute('role', 'doc-bibliography');
  }
  if (containsRefList) {
    this.passThrough(section, xmlnode);
    return;
  }
  const dl = this.createNode('dl', '');
  section.appendChild(dl);
  xmlnode.querySelectorAll('ref').forEach(this.recurseTheDom.bind(null, dl));
};
