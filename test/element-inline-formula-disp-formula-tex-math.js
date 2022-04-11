import { article } from './helper.js';
import tape from 'tape';

tape('inline-formula, disp-formula, tex-math', async function (t) {
  t.plan(14);
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
  const disptex = displayformula.innerHTML;
  t.ok(displayformula, 'Display formula');
  t.equal(
    displayformula.getAttribute('data-ams-qed-box'),
    'true',
    'has-qed-box'
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
  // NOTE JS implementation removed extra space between the two strings
  // TODO unify
  t.equal(
    disptex, '\\xhref[fn]{#fnid2}{{}^{2}}\\text{Start\\xhref[other]{#otherid2}{\\$}End}',
    'tex-math/text/xref'
  );
  const formulaNestedTeX = document.querySelectorAll('#equations [data-ams-doc="math inline"]')[1];
  t.equal(formulaNestedTeX.innerHTML, ' \\text{Te\\$t$x^2$} ');

  // text-mode text styling
  const dispWithText = document.querySelectorAll(
    '#equations [data-ams-doc="math block"]'
  )[1];
  t.equal(dispWithText.innerHTML, ' \\text{\\textrm{roman\\#} \\mathsc{sc\\$} \\textit{italic\\_} \\textbf{bold\\$} \\textsf{sans-serif\\&amp;} \\texttt{monospace} \\href{https://ext~}{ext-link\\unicode{x7E}} inside text} ', 'Text markup inside text + escaping active characters');
});
