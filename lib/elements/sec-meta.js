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

import { generateByline } from "../helpers/generateByline.js";
/**
 * sec-meta element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const contributors = this.extractContribGroups(xmlnode);
  const secmetaSection = this.createNode('section', '', {
    'data-ams-doc': 'sec-meta',
    'data-ams-contributors': JSON.stringify(contributors),
    'data-ams-byline': generateByline(contributors),
  });
  htmlParentNode.appendChild(secmetaSection);

  // NOTE: use cases for content within sec-meta so far: MCL1/14 has abstract; noti2382 has notes.
  this.passThrough(secmetaSection, xmlnode);
  // NOTE: MCL01, MCL14 also have questionable contrib-group with just author-comment (which was intentionally broken via #254, cf. also AmerMathSoc/mcl#13)
};
