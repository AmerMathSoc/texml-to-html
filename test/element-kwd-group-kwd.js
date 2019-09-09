const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: kwd-group, kwd', async function(t) {
  t.plan(2);
  const input = path.resolve(__dirname, 'element-kwd-group-kwd.xml');
  const document = await xsltproc(input);
  t.ok(document.querySelector('section[data-ams-doc="article"] ul'), 'kwd-group to ul');
  t.ok(document.querySelector('section[data-ams-doc="article"] ul li'), 'kwd to li');
});

