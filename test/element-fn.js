
const { article } = require('./helper.js');
const tape = require('tape');


tape('Template: fn, fn/label', async function(t) {
  t.plan(3);
  const document = article;
  const footnote = document.querySelector('div[role="doc-footnote"]');
  t.ok(footnote, 'fn becomes div with role doc-footnote');
  t.equal(footnote.innerHTML, '', 'footnote label is stripped');
  t.notOk(document.querySelector('#fnid').closest('p'), 'footnote moved out of paragraph')
});

