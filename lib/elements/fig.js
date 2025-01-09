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
 * fig element, also used for fig-group, verse-group, table-wrap, table-wrap-group
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const figure = this.createNode('figure', '', {
    'data-ams-doc': xmlnode.tagName
  });
  if (xmlnode.getAttribute('position')) figure.setAttribute('data-ams-position', xmlnode.getAttribute('position'));
  mapAttributes(figure, xmlnode);
  htmlParentNode.appendChild(figure);

  const label = xmlnode.querySelector(':scope>label');
  const caption = xmlnode.querySelector(':scope>caption');
  const attrib = xmlnode.querySelector(':scope>attrib');
  
  if (label || caption || attrib) {
    const figcaption = this.createNode('figcaption');
    figure.appendChild(figcaption);
    if (label) {
      const strong = this.createNode('strong');//TODO: cf. & unify with label.js; NOTE: no space after label necessary (since downstream rewrites things); but space shouldn't be harmful if we unify with label.js.
      figcaption.appendChild(strong);
      this.passThrough(strong, label);
      label.remove();//NOTE: prevent duplicate processing later on
    }
    if (caption) {
      this.passThrough(figcaption, caption);
    }
    if (attrib) {
      figcaption.insertAdjacentText('beforeend', ' '); //NOTE figcaptioninline content
      this.redirectRecurseTheDom(figcaption, attrib);
    }
  }
  // process remaining children
  this.passThrough(figure, xmlnode);
};
