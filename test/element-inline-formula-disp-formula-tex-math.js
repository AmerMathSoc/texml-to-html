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

tape('inline-formula, disp-formula, tex-math', async function (t) {
  t.plan(20);
  const document = article;
  const inlineformula = document.querySelector(
    '#equations [data-ams-doc="math inline"]'
  );
  t.ok(inlineformula, 'Inline formula');
  const tex = inlineformula.innerHTML;
  t.ok(
    tex.includes('\\text{Te\\#t }'),
    'tex-math/text (with unicode spacing characters)'
  );
  t.ok(
    tex.includes('\\xhref[fn]{#fnid1}{{}^{1}}'),
    'tex-math/xref@ref-type="fn"'
  );
  t.ok(
    tex.includes('\\xhref[other]{#otherid1}{}'),
    'tex-math/xref@ref-type="other"'
  );
  const footnote = document.querySelector('#fnid');
  t.ok(
    footnote.getAttribute('role'),
    'doc-footnote',
    'Inline-formula Footnote'
  );
  t.notOk(footnote.closest('p, span'), 'footnote moved out of span and paragraph');
  t.ok(footnote.querySelector('a'), 'xref in footnote within tex-math not rewritten to TeX macro')

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
    displayformula.innerHTML.includes('\\xhref[fn]{#fnid2}{{}^{2}}'),
    'tex-math/xref@ref-type="fn"'
  );
  t.ok(
    displayformula.nextElementSibling.getAttribute('role'),
    'doc-footnote',
    'Display-formula Footnote'
  );
  const disptex = displayformula.lastElementChild.innerHTML;
  // NOTE JS implementation removed extra space between the two strings
  t.equal(
    disptex, '\\xhref[fn]{#fnid2}{{}^{2}}\\text{Start\\xhref[other]{#otherid2}{\\$}End}',
    'tex-math/text/xref'
  );
  const formulaNestedTeX = document.querySelectorAll('#equations [data-ams-doc="math inline"] > tex-math')[1];
  t.equal(formulaNestedTeX.innerHTML, '\\text{Te\\$t$x^2$}');

  // text-mode text styling
  const dispWithText = document.querySelectorAll(
    '#equations [data-ams-doc="math block"] > tex-math'
  );
  t.equal(dispWithText[1].innerHTML, ' \\text{\\textrm{roman\\#} $\\mathsc{sc\\$}$ \\textit{italic\\_} \\textbf{bold\\$} \\textsf{sans-serif\\&amp;} \\texttt{monospace} \\href{https://ext~}{ext-link\\unicode{x7E}} inside text} ', 'Text markup inside text + escaping active characters');

  // formula in footnote in formula not treated as nested formula
  t.equal(document.querySelector('#fnid5').innerHTML, '<span data-ams-doc="label"><sup></sup></span><span data-ams-doc="math inline"><tex-math>x</tex-math></span>', 'Formula with footnote with formula');
  // formula in formula at implicit text mode
  t.equal(dispWithText[5].innerHTML, '\\tag{$x$}', 'Formula with with formula in implicit text mode');

  // formula of type text (aka "thingy" environment)
  t.ok(document.querySelector('div[data-ams-doc="math text"]'), 'Display Formula of content-type=text');
  t.equal(document.querySelector('div[data-ams-doc="math text"] > span[data-ams-doc="label"]#textEquation+p').previousElementSibling.innerHTML, '(T)', 'Display Formula of content-type=text, label and paragraph');

  // formula with cite-group and cite-detail
  t.equal(dispWithText[9].innerHTML, ' <ams-x>[</ams-x>\\xhref[bibr]{#bibr-AEG0}{AEG08<cite-detail><ams-x>, </ams-x>Section 5</cite-detail>}<ams-x></ams-x> ', 'Formula with cite-group, cite-detail')
});
