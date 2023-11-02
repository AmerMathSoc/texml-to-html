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

/**
 * notes element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const section = this.createNode('section');
  mapAttributes(section, xmlnode);
  const notesType = xmlnode.getAttribute('notes-type');
  section.setAttribute('data-ams-doc', 'notes');
  section.setAttribute('data-ams-content-type', notesType);
  if (notesType === 'dedication')
    section.setAttribute('role', 'doc-dedication');
  htmlParentNode.appendChild(section);
  if (this.isBook) section.setAttribute('data-ams-doc-level', '0');

  this.passThrough(section, xmlnode);
};
