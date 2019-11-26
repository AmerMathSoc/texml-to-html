const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: book//sec-meta => contrib-group, author-comment, abstract/title', async function(t) {
  t.plan(5);

  const input = path.resolve(__dirname, 'book.xml');
  const document = await xsltproc(input);
  const section = document.querySelector('#secmeta');
  t.ok(section.querySelector('p'), 'sec-meta//contrib-group becomes p');
  t.equal(section.querySelector('p span').innerHTML.trim(), 'comment', 'sec-meta//contrib-group/author-comment becomes span');
  t.ok(section.querySelector('h1'), 'title becomes h1');
  t.equal(section.querySelector('h1').innerHTML, 'Title', 'title content in heading');
  t.ok(section.querySelector('[role="doc-abstract"] h2'), 'abstract title becomes h2');
});
