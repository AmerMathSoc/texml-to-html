
import { article } from './helper.js';
import tape from 'tape';


tape('Template: roman', async function(t) {
  t.plan(1);
  const document = article;
  t.ok(document.querySelector('span[data-ams-style="roman"]'), 'Roman as span with data-ams-style attribute');
});

