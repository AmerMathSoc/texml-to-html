import { article } from './helper.js';
import tape from 'tape';

tape('Template: @rowspan, @colspan', async function(t) {
  t.plan(2);
  const document = article;
  const td = document.querySelector('td#tdattributes');
  t.equal(td.getAttribute('colspan'), '1', 'colspan attribute');
  t.equal(td.getAttribute('rowspan'), '2', 'colspan attribute');
});

