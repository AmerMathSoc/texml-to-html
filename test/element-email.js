
import { article } from './helper.js';
import tape from 'tape';

tape('Template: email', async function(t) {
  t.plan(1);
  const document = article;
  const email = document.querySelector('a[href="mailto://email"]');
  t.equal(email.innerHTML, 'email', 'email to anchor with mailto address');
});
