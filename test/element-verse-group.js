const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: verse-group', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  const figure = document.querySelector('figure[data-ams-doc="verse-group"]');
  t.ok(figure, 'Figure data-ams-doc=verse-group attribute');
});

