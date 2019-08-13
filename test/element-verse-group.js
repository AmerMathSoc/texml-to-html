const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: verse-group', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'element-verse-group.xml');
  const document = await xsltproc(input);
  const figure = document.querySelector('figure');
  t.equal(figure.getAttribute('data-ams-doc'), 'verse-group', 'Figure data-ams-doc attribute');
});

