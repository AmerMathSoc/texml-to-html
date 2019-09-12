const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: funding-group, funding-statement', async function(t) {
  t.plan(3);
  const input = path.resolve(__dirname, 'element-funding-group.xml');
  const document = await xsltproc(input);
  t.equal(document.querySelector('section[data-ams-doc="article"] dt').innerHTML, 'Additional Notes', 'funding-group produces DT with content');
  t.ok(document.querySelector('section[data-ams-doc="article"] dt+dd'), 'funding-group produces DT+DD');
  t.ok(document.querySelector('section[data-ams-doc="article"] dt+dd p'), 'funding-statement in funding-statement produces P in DD');
});

