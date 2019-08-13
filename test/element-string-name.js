const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: string-name', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'element-string-name.xml');
  const document = await xsltproc(input);
  const span =  document.querySelector('section[data-ams-doc="article"] span');
  t.equal(span.getAttribute('data-ams-doc'), 'stringname', 'Stringname data-ams-doc attribute');
});

