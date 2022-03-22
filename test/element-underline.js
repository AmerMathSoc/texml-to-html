
import { article } from './helper.js';
import tape from 'tape';


tape('Template: underline', async function(t) {
  t.plan(1);
  const document = article;
  t.ok(document.querySelector('u'), 'Underline u element');
});

