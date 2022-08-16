
import { article } from './helper.js';
import tape from 'tape';


tape('Template: p, nested paragraphs', async function(t) {
  t.plan(1);
  const document = article;
  t.ok(document.querySelector('dl#pid2 > div > dd > p'), 'paragraph inside def-list stays paragraph')
});

