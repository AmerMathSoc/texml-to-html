const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: x', async function(t) {
  t.plan(4);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  t.equal(document.querySelector('a[href="#rid5"][data-ams-ref="type"]').innerHTML, 'Context ref', 'xref with generic type with x child preserved');
  t.equal(document.querySelector('cite a[href="#rid4"][data-ams-ref="bibr"][role="doc-biblioref"]').innerHTML, 'ref, note', 'xref with ref-type bibr with x child preserve');
  t.equal(document.querySelector('p#pwithx').innerHTML, 'Is  ignored.', 'x in article is ignored');
  const input2 = path.resolve(__dirname, 'book.xml');
  const document2 = await xsltproc(input2);
  t.equal(document2.querySelector('p#pwithx').innerHTML, 'Is not ignored.', 'x in book is preserved');
});
