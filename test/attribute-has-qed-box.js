import { article } from './helper.js';
import tape from 'tape';


tape('Template: @has-qed-box', async function(t) {
  t.plan(2);
  const document = article;
  const qedboxEl = document.querySelector('[data-ams-qed-box]');
  t.ok(qedboxEl, 'Element with data-ams-qed-box attribute');
  t.notOk(document.querySelector('[data-ams-doc="math inline"][data-ams-qed-box]'), 'has-qed-box ignored on inline-formula');
});

