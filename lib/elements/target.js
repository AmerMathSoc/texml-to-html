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
import { node2macro } from '../helpers/helpers-tex.js';

/**
 * target element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  if (xmlnode.closest('tex-math')) {
    node2macro.apply(this, [htmlParentNode, xmlnode, `cssId{${xmlnode.id}}`, false]);
    return;
  }
  const span = this.createNode('span');
  const isTextEquation = (xmlnode.parentNode.tagName === 'disp-formula' && xmlnode.parentNode.getAttribute('content-type') === 'text');
  if (isTextEquation) htmlParentNode.prepend(span); // NOTE: inside a "text equation" we prepend to get a left-side label, but cf. also AmerMathSoc/texml#232 
  else htmlParentNode.appendChild(span);
  mapAttributes(span, xmlnode);
  this.passThrough(span, xmlnode);
};
