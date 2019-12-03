const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('inline-formula, disp-formula, tex-math', async function(t) {
  t.plan(10);
  const input = path.resolve(
    __dirname,
    'article.xml'
  );
  const document = await xsltproc(input);
  const inlineformula = document.querySelector('#equations [data-ams-doc="math inline"]');
  t.ok(inlineformula, 'Inline formula');
  const tex = inlineformula.innerHTML;
  t.ok(tex.includes('\\text{Text}'), 'tex-math/text');
  t.ok(
    tex.includes('\\xhref[fn]{#fnid1}{{}^{1}}'),
    'tex-math/xref@ref-type="fn"'
  );
  t.ok(
    tex.includes('\\xhref[other]{#otherid1}{}'),
    'tex-math/xref@ref-type="other"'
  );
  t.ok(
    inlineformula.nextElementSibling.getAttribute('role'),
    'doc-footnote',
    'Inline-formula Footnote'
  );

  const displayformula = document.querySelector('#equations [data-ams-doc="math block"]');
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
  t.ok(disptex.includes('\\text{Start$ \\xhref[other]{#otherid2}{}$End}'), 'tex-math/text/xref');
});
