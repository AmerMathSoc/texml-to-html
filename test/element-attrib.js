
import { article } from './helper.js';
import tape from 'tape';


tape('Fig with attrib', async function(t) {
  t.plan(1);
  const document = article;
  t.ok(document.querySelector('figure#figattrib figcaption span'), 'attrib in figcaption');
});

