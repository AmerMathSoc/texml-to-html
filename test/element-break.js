import { article } from './helper.js';
import tape from 'tape';


tape('Template: break', async function(t) {
  t.plan(1);
  const document = article;
  const br =  document.querySelector('section[data-ams-doc="article"] br');
  t.ok(br, 'BR element in article');
});

