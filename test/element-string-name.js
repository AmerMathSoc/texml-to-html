import { article } from './helper.js';
import tape from 'tape';


tape('Template: string-name', async function(t) {
  t.plan(1);
  const document = article;
  const span =  document.querySelector('span[data-ams-doc="stringname"]');
  t.ok(span, 'stringname', 'Stringname data-ams-doc attribute');
});

