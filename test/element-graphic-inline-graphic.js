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


tape('Template: img, graphics', async function(t) {
  t.plan(10);
  const document = article;
  const graphic =  document.querySelector('img[data-ams-doc="graphic"]');
  t.ok(graphic, 'img with data-ams-doc=graphic');
  t.equal(graphic.getAttribute('src'), 'file', 'graphic href as source');
  t.equal(graphic.getAttribute('alt'), 'text', 'graphic alt-text');
  t.equal(graphic.getAttribute('data-ams-style'), 'use', 'graphic specific-use');
  t.equal(graphic.getAttribute('data-ams-height'), '100pt', 'graphic height');
  t.equal(graphic.getAttribute('data-ams-width'), '100px', 'graphic width (with added unit)');
  t.equal(graphic.getAttribute('alt'), 'text', 'alt attribute');

  const inlinegraphic =  document.querySelector('img[data-ams-doc="inline-graphic"]');
  t.ok(inlinegraphic, 'img with data-ams-doc=inline-graphic');
  t.equal(inlinegraphic.getAttribute('alt'), 'Graphic without alt text', 'alt attribute fallback');

  const mathWithGraphic =  [...document.querySelectorAll('[data-ams-doc="math block"] > tex-math')].find(node => node.innerHTML.trim() === 'x = \\vcenter{\\img[][12pt][12pt][{custom dictionary alt}]{Images/test.svg}}');
  t.ok(mathWithGraphic, 'Graphic inside formula');
});

