
import { article } from './helper.js';
import tape from 'tape';


tape('Template: ext-link', async function (t) {
  t.plan(3);
  const document = article;
  const extlink = document.querySelector('a[href="https://"]');
  t.ok(extlink, 'Element ext-link becomes a with href');
  t.notOk(document.querySelector('a[href="https://nested2"] a'), 'ext-link with xref inside does not produce nested link');
  t.ok(document.querySelector('a[href="https://nested2"]+span').querySelector('a[data-ams-ref="nested"]'), 'xref inside ext-link moved after ext-link');
});

