
const { article } = require('./helper.js');
const tape = require('tape');

tape('subtitle', async function(t) {
  t.plan(2);
  const document = article;

  const subtitle = document.querySelector('p[data-ams-doc="subtitle"]');
  t.ok(subtitle, 'subtitle to p with data-ams-doc');
  t.equal(
    subtitle.getAttribute('data-ams-doc-level'),
    subtitle.previousElementSibling.tagName.substring(1),
    'subtitle gets correct data-ams-doc-level'
  );
});
