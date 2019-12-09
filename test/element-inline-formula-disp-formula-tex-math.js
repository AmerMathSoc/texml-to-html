const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('inline-formula, disp-formula, tex-math', async function(t) {
  t.plan(11);
  const input = path.resolve(
    __dirname,
    'article.xml'
  );
  const document = await xsltproc(input);
  const inlineformula = document.querySelector('#equations [data-ams-doc="math inline"]');
  t.ok(inlineformula, 'Inline formula');
  const tex = inlineformula.innerHTML;
  t.ok(tex.includes('\\text{Text }'), 'tex-math/text (with unicode spacing characters)');
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
  // NOTE JS implementation removed extra space between the two strings
  // TODO unify
  t.ok(disptex.includes('\\text{Start$'), 'tex-math/text/xref partial');
  t.ok(disptex.includes('\\xhref[other]{#otherid2}{}$End}'), 'tex-math/text/xref partial');
});
