const { article, articleAlttitle } = require('./helper.js');
const tape = require('tape');


tape('ref-list, ref-list/title, ref, ref/label', async function (t) {
  t.plan(10);
  const document = article;
  const bibliography = document.querySelector('section[role="doc-bibliography"]');
  t.ok(bibliography, 'Section with role doc-bibliography');
  t.ok(bibliography.querySelector('h2'), 'Bibliography heading in article');
  t.ok(bibliography.querySelector('dl dt#ref'), 'Reference as DT with ID');
  t.equal(bibliography.querySelector('dl dt#ref').innerHTML, 'Label', 'Reference label in DT');

  t.ok(bibliography.querySelector('dl dt#refnolabel+dd'), 'Reference without label');

  const document2 = articleAlttitle;
  const bib = document2.querySelector('section[role="doc-bibliography"]');
  t.ok(bib, 'Outer ref-list Section with role doc-bibliography');
  t.ok(bib.querySelector('h2'), 'Outer ref-list heading');
  t.notOk([...bib.children].filter(node => node.tagName === "DL").length, 'Outer ref-list does not have a DL child');
  const nestedBib = bib.querySelector('section');
  t.ok(nestedBib.querySelector('h3'), 'Inner ref-list heading');
  t.ok(nestedBib.querySelector('dl'), 'Inner ref-list has DL');
});
