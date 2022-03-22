
import { article } from './helper.js';
import tape from 'tape';


tape('Template: funding-group, funding-statement', async function(t) {
  t.plan(3);
  const document = article;
  let fundinggroup = {};
  document.querySelectorAll('section[data-ams-doc="copyright-page"] dt').forEach ( node => {
    if (node.innerHTML === "Additional Notes") fundinggroup = node;
  })
  t.equal(fundinggroup.innerHTML, 'Additional Notes', 'funding-group produces DT with content');
  t.equal(fundinggroup.nextElementSibling.tagName, 'DD', 'funding-group produces DT+DD');
  t.equal(fundinggroup.nextElementSibling.querySelectorAll('p').length, 2, 'funding-group produces DT+DD with a paragraph for each funding-statement');
});

