const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('table element', async function (t) {
  t.plan(1);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  // NOTE <table> is tested in test/copyElement.js
  t.ok(
    document.querySelector('div[data-ams-doc="table-wrap"] > table'),
    `Table has wrapper`
  );
});
