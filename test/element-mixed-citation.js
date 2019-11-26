const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: mixed-citation', async function(t) {
  t.plan(2);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  const mixedCitation = document.querySelector(
    'dd > div[role="doc-biblioentry"]'
  );
  const rawCitation = mixedCitation.querySelector(
    'code[data-ams-doc="amsref"]'
  );
  t.ok(mixedCitation, 'Element mixed-citation');
  t.ok(rawCitation, 'Element raw-citation');
});
