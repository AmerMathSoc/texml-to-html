const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: funding-group, funding-statement', async function(t) {
  t.plan(3);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  let fundinggroup = {};
  document.querySelectorAll('section[data-ams-doc="copyright-page"] dt').forEach ( node => {
    if (node.innerHTML === "Additional Notes") fundinggroup = node;
  })
  t.equal(fundinggroup.innerHTML, 'Additional Notes', 'funding-group produces DT with content');
  t.ok(document.querySelector('section[data-ams-doc="copyright-page"] dt+dd'), 'funding-group produces DT+DD');
  t.ok(document.querySelector('section[data-ams-doc="copyright-page"] dt+dd p'), 'funding-statement in funding-statement produces P in DD');
});

