const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Empty Labels should be stripped', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  t.equal(document.querySelector('#emptyLabel').innerHTML.trim(), '', 'Statement with no title and empty label');
});
