import { article } from './helper.js';
import tape from 'tape';


tape('Template: @style', async function(t) {
  t.plan(1);
  const document = article;
  const style = document.querySelector('[data-ams-style]');
  t.ok(style, 'Element with data-ams-style attribute');
});

