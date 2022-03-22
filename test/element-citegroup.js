import { article } from './helper.js';
import tape from 'tape';


tape('Template: cite-group', async function(t) {
  t.plan(1);
  const document = article;
  t.equal(document.querySelectorAll('section#citegroup a').length, 2, 'cite-group passed through, leaving two anchors');
});
