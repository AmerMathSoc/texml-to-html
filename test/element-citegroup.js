const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: cite-group', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  t.equal(document.querySelector('section#citegroup').innerHTML.trim(), '<a href="#rid1" data-ams-ref="type">ref</a><a href="#rid2" data-ams-ref="fn" role="doc-noteref">ref</a>', 'cite-group passed through');
});
