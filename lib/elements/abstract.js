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
 * abstract element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const level = getParentLevel(htmlParentNode) || '1'; // NOTE in articles, we don't have a disp-level in the XML; also NOTE that this is a change from xslt which erroneously had hardcoded 1 but abstract/title still got an h2
  const section = this.createNode('section', '', {
    'data-ams-doc-level': level,
    role: 'doc-abstract'
  });
  mapAttributes(section, xmlnode);
  if (xmlnode.getAttribute('xml:lang')) section.setAttribute('lang', xmlnode.getAttribute('xml:lang')); // NOTE: after AmerMathSoc/texml#192, we may want a more general solution (e.g., mapAttributes())
  htmlParentNode.appendChild(section);
  this.createHeading(section, xmlnode);
  this.passThrough(section, xmlnode);
};
