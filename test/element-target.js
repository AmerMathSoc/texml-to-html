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


tape('Template: target', async function(t) {
  t.plan(2);
  const document = article;
  const targetSpan = document.querySelector('section[data-ams-doc="article"] span#target');
  t.ok(targetSpan, 'Convert to span inside article');

  // target in tex-math
  const equationsBlock = [...document.querySelectorAll('[data-ams-doc="math block"]>tex-math')];
  t.ok(equationsBlock.find(node => node.innerHTML === '\\cssId{targetMath}{_\\tag{$x$}}'), 'Convert to \\cssId inside tex-math');

});

