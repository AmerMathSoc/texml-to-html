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

tape('inline-formula, disp-formula', async function (t) {
  t.plan(13);
  const document = article;
  const inlineformula = document.querySelector(
    '#equations [data-ams-doc="math inline"]'
  );
  t.ok(inlineformula, 'Inline formula');
  t.ok(inlineformula.innerHTML.startsWith(`<tex-math`), 'Inline formula: no leading whitespace before tex-math');
  t.ok(inlineformula.innerHTML.endsWith(`</tex-math>`), 'Inline formula: no trailing whitespace after tex-math');
  const footnote = document.querySelector('#fnid');
  t.ok(
    footnote.getAttribute('role'),
    'doc-footnote',
    'Inline-formula Footnote'
  );
  t.notOk(footnote.closest('p, span'), 'footnote moved out of span and paragraph');

  const displayformula = document.querySelector(
    '#equations [data-ams-doc="math block"]'
  );
  t.ok(displayformula, 'Display formula');
  t.equal(
    displayformula.getAttribute('data-ams-qed-box'),
    'true',
    'has-qed-box'
  );
  t.equal(
    displayformula.getAttribute('data-ams-specific-use'),
    'special',
    'disp-formula gets attributes from tex-math mapped'
  );
  t.ok(
    displayformula.nextElementSibling.getAttribute('role'),
    'doc-footnote',
    'Display-formula Footnote'
  );
  // formula of type text (aka "thingy" environment)
  t.ok(document.querySelector('div[data-ams-doc="math text"]'), 'Display Formula of content-type=text');
  t.equal(document.querySelector('div[data-ams-doc="math text"] > span#textEquation').innerHTML.trim(), '<span data-ams-doc="label">(T)</span>', 'Display Formula of content-type=text, label contents and placement before paragraph');
  const textEquations = document.querySelectorAll('div[data-ams-doc="math text"]');
  t.equal(textEquations[0].firstElementChild.getAttribute('id'), 'textEquation', 'Display Formula of content-type=text: first child ID (from target)');
  t.equal(textEquations[1].firstElementChild.getAttribute('data-ams-doc'), 'label', 'Display Formula of content-type=text: first child from tag (no target)');

});
