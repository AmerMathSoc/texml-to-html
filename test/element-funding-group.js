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
  t.equal(fundinggroup.nextElementSibling.tagName, 'DD', 'funding-group produces DT+DD');
  t.equal(fundinggroup.nextElementSibling.querySelectorAll('p').length, 2, 'funding-group produces DT+DD with a paragraph for each funding-statement');
});

