
import { article } from './helper.js';
import tape from 'tape';


tape('Template: target', async function(t) {
  t.plan(1);
  const document = article;
  const targetSpan = document.querySelector('section[data-ams-doc="article"] span#target');
  t.ok(targetSpan, 'Convert to span inside article');
});

