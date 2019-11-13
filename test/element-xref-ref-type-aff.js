const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: contrib-group/xref@ref-type="aff"', async function(t) {
  t.plan(2);
  const input = path.resolve(
    __dirname,
    'article.xml'
  );
  const document = await xsltproc(input);
  const link1 = document.querySelector('dt[data-ams-doc-contrib="contribB name"]').nextElementSibling;
  t.equal(link1.innerHTML.trim(), '<span>Address at time of publication: </span>Aff1', 'xref ref-type aff linking to aff with specific-use=current creates DD with content');
  t.equal(link1.nextElementSibling.outerHTML.trim(), '<dd>Aff2</dd>', 'xref ref-type aff creates DD with content');
});
