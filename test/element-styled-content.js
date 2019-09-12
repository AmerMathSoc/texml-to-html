const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: styled-content', async function(t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'element-styled-content.xml');
  const document = await xsltproc(input);
  t.ok(document.querySelector('span[data-ams-style="type"]'), 'Styled-content as span with data-ams-style');
});

