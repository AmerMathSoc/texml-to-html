const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: fn, fn/label', async function(t) {
  t.plan(2);
  const input = path.resolve(__dirname, 'element-fn.xml');
  const document = await xsltproc(input);
  const footnote = document.querySelector('span[role="doc-footnote"]');
  t.ok(footnote, 'fn becomes span with role doc-footnote');
  t.equal(footnote.innerHTML, '', 'footnote label is stripped');
});

