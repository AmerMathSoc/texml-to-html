
const { article } = require('./helper.js');
const tape = require('tape');


tape('Template: xref', async function(t) {
  t.plan(6);
  const document = article;
  t.ok(document.querySelector('a[href="#rid1"][data-ams-ref="type"]'), 'xref as anchor with href, data-ams-ref');
  t.ok(document.querySelector('a[href="#rid2"][data-ams-ref="fn"][role="doc-noteref"]'), 'xref with ref-type fn has role doc-noteref');
  t.ok(document.querySelector('cite a[href="#rid3"][data-ams-ref="bibr"][role="doc-biblioref"]'), 'xref with ref-type bibr a cite with anchor with href, data-ams-ref, role doc-biblioref');
  t.ok(document.querySelector('span[data-ams-ref="notrid"]'), 'xref without rid as span with data-ams-ref notrid');
  t.notOk(document.querySelector('a[data-ams-ref="nested"] a'), 'xref with ext-link inside does not have nested link');
  t.ok(document.querySelector('a[data-ams-ref="nested"]+span').querySelector('a[href="https://nested"]'), 'ext-link inside xref moved after xref');
});
