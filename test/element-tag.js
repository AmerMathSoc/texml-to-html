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


import { article } from './helper.js';
import tape from 'tape';


tape('Template: tag', async function (t) {
  t.plan(5);
  const document = article;

  const equationsBlock = [...document.querySelectorAll('[data-ams-doc="math block"] > tex-math')];

  // formula in formula at implicit text mode
  t.equal(equationsBlock[5].innerHTML, '\\tag{$x$}', 'Formula within formula in implicit text mode');


  t.ok(equationsBlock.find(node => node.innerHTML === '\\cssId{targetMath}{_\\tag{$x$}}'), 'Tag with tex-math');

  const tagStar = equationsBlock.find(node => node.innerHTML === '\\tag*{tag*}')
  t.ok(tagStar, 'Tag with parens="no"');

  // tag extraction
  t.notOk(tagStar.hasAttribute('data-ams-tags'), 'No extracted tags if none are linked to');
  t.equal(equationsBlock.find(node => node.innerHTML === '\\tag{PlainTag}\\cssId{targetMath2}{\\tag{$\\mathbb{N}$}}\\cssId{targetMath3}{\\tag{TextTag}}').getAttribute('data-ams-tags'), '["PlainTag","$\\\\mathbb{N}$","TextTag"]', 'All tags stored in attribute if one was linked to');

});

