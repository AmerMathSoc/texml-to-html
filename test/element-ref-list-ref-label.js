const { article } = require('./helper.js');
const tape = require('tape');


tape('ref-list, ref-list/title, ref, ref/label', async function(t) {
  t.plan(5);
  const document = article;
  const bibliography = document.querySelector('section[role="doc-bibliography"]');
  t.ok(bibliography, 'Section with role doc-bibliography');
  t.ok(bibliography.querySelector('h2'), 'Bibliography heading in article');
  t.ok(bibliography.querySelector('dl dt#ref'), 'Reference as DT with ID');
  t.ok(bibliography.querySelector('dl dt#ref span'), 'Reference label as span');

  t.ok(bibliography.querySelector('dl dt#refnolabel+dd'), 'Reference without label');
 });
