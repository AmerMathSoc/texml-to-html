const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: xref', async function(t) {
  t.plan(6);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  t.ok(document.querySelector('a[href="#rid1"][data-ams-ref="type"]'), 'xref as anchor with href, data-ams-ref');
  t.ok(document.querySelector('a[href="#rid2"][data-ams-ref="fn"][role="doc-noteref"]'), 'xref with ref-type fn has role doc-noteref');
  t.ok(document.querySelector('cite a[href="#rid3"][data-ams-ref="bibr"][role="doc-biblioref"]'), 'xref with ref-type bibr a cite with anchor with href, data-ams-ref, role doc-biblioref');
  t.equal(document.querySelector('cite a[href="#rid4"][data-ams-ref="bibr"][role="doc-biblioref"]').innerHTML, 'ref, note', 'xref with ref-type bibr with x child preserve');
  t.equal(document.querySelector('a[href="#rid5"][data-ams-ref="type"]').innerHTML, 'Context ref', 'xref with generic type with x child preserved');
  t.ok(document.querySelector('span[data-ams-ref="notrid"]'), 'xref without rid as span with data-ams-ref notrid');
});
