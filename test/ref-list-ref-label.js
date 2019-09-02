const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('ref-list, ref-list/title, ref, ref/label', async function(t) {
  t.plan(4);
  const input = path.resolve(__dirname, 'ref-list-ref-label.xml');
  const document = await xsltproc(input);
  console.log(document.body.outerHTML);
  const bibliography = document.querySelector('section[role="doc-bibliography"]');
  t.ok(bibliography, 'Section with role doc-bibliography');
  t.ok(bibliography.querySelector('h2'), 'Bibliography heading in article');
  t.ok(bibliography.querySelector('dl dt#ref'), 'Reference as DT with ID');
  t.ok(bibliography.querySelector('dl dt#ref span'), 'Reference label as span');
 });
