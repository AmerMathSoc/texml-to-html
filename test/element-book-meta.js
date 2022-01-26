
const { book } = require('./helper.js');
const tape = require('tape');

const jsonSnapshot = require('./book-meta-snapshot.json');

tape('Template: book-meta', async function (t) {
  t.plan(2);

  const document = book;
  const titlepage = document.querySelector('section[data-ams-doc="titlepage"]');
  t.ok(titlepage, 'book-meta creates section with data-ams-doc=titlepage');
 
  const jsonScript = titlepage.querySelector('script[type="application/json"]');
  const jsonData = JSON.parse(jsonScript.textContent);

  t.deepEqual(jsonData, jsonSnapshot, 'JSON metadata');

});
