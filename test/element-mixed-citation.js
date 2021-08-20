
const { article } = require('./helper.js');
const tape = require('tape');

tape('Template: mixed-citation', async function(t) {
  t.plan(2);
  const document = article;
  const mixedCitation = document.querySelector(
    'dd > div[role="doc-biblioentry"]'
  );
  const rawCitation = mixedCitation.querySelector(
    'code[data-ams-doc="amsref"]'
  );
  t.ok(mixedCitation, 'Element mixed-citation');
  t.ok(rawCitation, 'Element raw-citation');
});
