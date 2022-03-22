import { article } from './helper.js';
import tape from 'tape';


tape('Template: @position', async function(t) {
  t.plan(1);
  const document = article;
  const qedboxEl = document.querySelector('[data-ams-specific-use]');
  t.ok(qedboxEl, 'Element with data-ams-specific-use attribute');
});

