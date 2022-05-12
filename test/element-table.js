
import { article } from './helper.js';
import tape from 'tape';

tape('table element', async function (t) {
  t.plan(2);
  const document = article;
  // NOTE <table> is tested in test/copyElement.js
  t.ok(
    document.querySelector('div[data-ams-doc="table-wrap"] > table'),
    `Table has wrapper`
  );
  t.ok(
    document.querySelector('table[class="tbl"]'),
    `Table has class attributes`
  );

});
