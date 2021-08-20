
const { book } = require('./helper.js');
const tape = require('tape');

tape('Template: book-meta/publisher, publisher-name, publisher-loc', async function(t) {
  t.plan(5);

  const document = book;
  const publisher1 = document.querySelectorAll('dd[data-ams-doc="book publisher"]')[0];
  t.ok(publisher1, 'publisher as dd with data-ams-doc publisher');

  t.equal(publisher1.firstElementChild.outerHTML, '<span>name1</span>', 'publisher content from publisher-name');
  t.equal(publisher1.firstElementChild.nextSibling.textContent.substring(0,2), ', ', 'publisher name followed by comma and whitespace if publisher-loc')
  t.equal(publisher1.firstElementChild.nextElementSibling.outerHTML.trim(), '<span>loc</span>', 'span from location');

  const publisher2 = document.querySelectorAll('dd[data-ams-doc="book publisher"]')[1];
  t.equal(publisher2.innerHTML.trim(), '<span>name2</span>', 'publisher content from publisher-name without publisher-loc');
});
