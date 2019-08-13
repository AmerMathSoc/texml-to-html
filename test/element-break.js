const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: break', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'element-break.xml');
  const document = await xsltproc(input);
  const br =  document.querySelector('section[data-ams-doc="article"] br');
  t.ok(br, 'BR element in article');
});

