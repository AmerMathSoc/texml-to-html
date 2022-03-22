
import { article } from './helper.js';
import tape from 'tape';


tape('Template: img', async function(t) {
  t.plan(3);
  const document = article;
  const img =  document.querySelector('section[data-ams-doc="article"] img');
  t.ok(img, 'img element in article');
  t.equal(img.getAttribute('src'), 'file', 'img source');
  t.equal(img.getAttribute('alt'), 'text', 'img alt-text');
});

