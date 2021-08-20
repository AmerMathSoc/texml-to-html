
const { article } = require('./helper.js');
const tape = require('tape');

tape('table element', async function (t) {
  t.plan(1);
  const document = article;
  // NOTE <table> is tested in test/copyElement.js
  t.ok(
    document.querySelector('div[data-ams-doc="table-wrap"] > table'),
    `Table has wrapper`
  );
});
