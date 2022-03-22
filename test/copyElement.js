import { article } from './helper.js';
import tape from 'tape';

tape('"copied" elements', async function(t) {
  const copyElements = [
    'sup',
    'sub',
    'table',
    'tbody',
    'thead',
    'th',
    'tr',
    'td',
    'pre',
    'hr'
  ];
  t.plan(copyElements.length);
  const document = article;
  copyElements.forEach(selector =>
    t.ok(document.querySelector(selector), `${selector} copied to output`)
  );
});
