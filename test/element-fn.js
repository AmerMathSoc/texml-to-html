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


tape('Template: fn, fn/label', async function (t) {
  t.plan(9);
  const document = article;
  const footnote = document.querySelector('div[role="doc-footnote"]');
  t.ok(footnote, 'fn becomes div with role doc-footnote');
  t.equal(footnote.getAttribute('aria-label'), 'Footnote Label', 'footnote aria-label attribute');
  const footnoteLabel = footnote.firstElementChild;
  t.equal(footnoteLabel.tagName, 'SPAN', 'footnote label');
  t.equal(footnoteLabel.getAttribute('data-ams-doc'), 'label', 'footnote label data attribute');
  t.equal(footnoteLabel.innerHTML, '<sup>Label</sup>', 'footnote label content');
  t.notOk(document.querySelector('#fnid').closest('p'), 'footnote moved out of paragraph')

  const parWithFootnotes = document.querySelector('#multifootnotes');
  const fn3 = document.querySelector('div#fnid3[role="doc-footnote"]');
  const fn4 = document.querySelector('div#fnid4[role="doc-footnote"]');
  t.equal(parWithFootnotes.nextElementSibling, fn3, 'Paragraph with multiple footnotes followed by first footnote');
  t.equal(fn3.nextElementSibling, fn4, 'Paragraph with multiple footnotes: first footnote followed by second footnote');

  // formula in footnote in formula not treated as nested formula
  t.equal(document.querySelector('#fnid5').innerHTML, '<span data-ams-doc="label"><sup></sup></span><span data-ams-doc="math inline"><tex-math>x</tex-math></span>', 'Formula with footnote with formula');
});

