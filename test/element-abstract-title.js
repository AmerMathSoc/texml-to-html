const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('abstract, abstract/title', async function(t) {
  t.plan(2);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  const abstract = document.querySelector('section[data-ams-doc-level="2"][role="doc-abstract"], section[data-ams-doc-level="1"][role="doc-abstract"]'); // TODO XSL has 1, JS has 2 (correct); drop 2 post-releases
  t.ok(abstract, 'Abstract as Section with data-ams-doc-level 1, role doc-abstract');
  t.ok(abstract.querySelector('h2'), 'Abstract title as h2');
 });
