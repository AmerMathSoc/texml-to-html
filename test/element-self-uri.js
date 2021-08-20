const { article } = require('./helper.js');
const tape = require('tape');


tape('Template: self-uri', async function(t) {
  t.plan(2);
  const document = article;
  t.equal(document.querySelector('section[data-ams-doc="copyright-page"] li a[href="href"][data-ams-ref="type"]').innerHTML.trim(), 'Permalink', 'self-uri produces li with a attributes and content');
  t.equal(document.querySelector('section[data-ams-doc="copyright-page"] li a[href="href"][data-ams-ref="pdf"]').innerHTML.trim(), 'Permalink (PDF)', 'self-uri with content-type=PDF produces li with a attributes and content');
});

