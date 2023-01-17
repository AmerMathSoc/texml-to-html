
import { article } from './helper.js';
import tape from 'tape';


tape('Template: funding-group, funding-statement', async function(t) {
  t.plan(2);
  const document = article;
  let fundinggroup = document.querySelector('div[data-ams-doc="funding-group"]')
  t.ok(fundinggroup, 'funding-group produces div with data-ams-doc');
  t.equal(fundinggroup.querySelectorAll('p').length, 2, 'funding-group contains paragraph for each funding-statement');
});

