import { article, articleAlttitle } from './helper.js';
import tape from 'tape';

tape('Template: article', async function(t) {
  t.plan(1);
  const document = article;
  t.ok(document.querySelector('section[data-ams-doc="article"]'));
});
