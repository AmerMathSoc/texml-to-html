const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: cite-group', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  t.equal(document.querySelectorAll('section#citegroup a').length, 2, 'cite-group passed through, leaving two anchors');
});
