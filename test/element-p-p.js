
import { article } from './helper.js';
import tape from 'tape';


tape('Template: p, nested paragraphs', async function(t) {
  t.plan(2);
  const document = article;
  t.ok(document.querySelector('p#pid1 > span[data-ams-doc="paragraph"]'), 'nested pargraph becomes span with data-ams-doc paragraph')
  t.ok(document.querySelector('dl#pid2 > div > dd > p'), 'paragraph inside def-list stays paragraph')
});

