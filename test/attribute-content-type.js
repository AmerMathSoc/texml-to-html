import { article } from './helper.js';
import tape from 'tape';

tape('Template: @content-type', async function (t) {
  t.plan(1);
  const document = article;
  const style = document.querySelector('[data-ams-content-type]');
  t.ok(style, 'Element with data-ams-content-type attribute');
});

