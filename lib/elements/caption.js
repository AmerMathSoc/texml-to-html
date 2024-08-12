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
 * caption element; also used for label element (when inside fig, table etc. - cf. label.js)
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const isLabel = xmlnode.tagName === 'label';
  if (
    isLabel &&
    xmlnode.nextElementSibling &&
    xmlnode.nextElementSibling.tagName === 'caption'
  ) {
    return;
  }
  const previousSibling = xmlnode.previousElementSibling;
  const hasLabel = previousSibling && previousSibling.tagName === 'label';

  const figcaption = this.createNode('figcaption');
  htmlParentNode.appendChild(figcaption);

  if (isLabel || hasLabel) {
    const label = isLabel ? xmlnode : previousSibling;
    const strong = this.createNode('strong');//TODO: cf. & unify with label.js; NOTE: no space after label necessary (since downstream rewrites things); but space shouldn't be harmful if we unify with label.js.
    figcaption.appendChild(strong);
    this.passThrough(strong, label);
  }
  if (isLabel) return;
  this.passThrough(figcaption, xmlnode);
};
