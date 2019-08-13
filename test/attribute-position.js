const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: @position', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'attribute-position.xml');
  const document = await xsltproc(input);
  const figure = document.querySelector('figure');
  t.equal(figure.getAttribute('data-ams-position'), 'anchor', 'Figure with data-ams-position attribute');
});

