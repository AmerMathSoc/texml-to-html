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

import { generateBookJson } from './book-meta-json.js';

/**
 * book-meta element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const titlepage = this.createNode('section', '', {
    'data-ams-doc': 'titlepage'
  });
  htmlParentNode.appendChild(titlepage);

  const script = this.createNode('script', '', { type: "application/json" });
  titlepage.append(script);
  script.textContent = generateBookJson.call(this, xmlnode);

  // MEMO books include abstract and other metadata inside book-meta; they are presented together so we group them here
  if (!xmlnode.querySelector('abstract')) return;
  const wrapperAbstract = this.createNode('section', '', {
    'data-ams-doc': 'abstract' //NOTE: abstract itself gets role=doc-abstract
  });
  htmlParentNode.appendChild(wrapperAbstract);
  this.recurseTheDom(wrapperAbstract, xmlnode.querySelector('abstract'));
  xmlnode.querySelectorAll('kwd-group').forEach(this.recurseTheDom.bind(null, wrapperAbstract));
  xmlnode.querySelectorAll('funding-group').forEach(this.recurseTheDom.bind(null, wrapperAbstract));
};
