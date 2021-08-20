
const { article } = require('./helper.js');
const tape = require('tape');


tape('Template: fn, fn/label', async function(t) {
  t.plan(2);
  const document = article;
  const footnote = document.querySelector('span[role="doc-footnote"]');
  t.ok(footnote, 'fn becomes span with role doc-footnote');
  t.equal(footnote.innerHTML, '', 'footnote label is stripped');
});

