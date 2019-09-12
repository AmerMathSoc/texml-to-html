const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: book//sec-meta => contrib-group, author-comment, abstract/title', async function(t) {
  t.plan(4);

  const input = path.resolve(__dirname, 'element-book-sec-meta.xml');
  const document = await xsltproc(input);
  const section = document.querySelector('#secmeta');
  t.ok(section.querySelector('p'), 'sec-meta//contrib-group becomes p');
  t.equal(section.querySelector('p span').innerHTML.trim(), 'comment', 'sec-meta//contrib-group/author-comment becomes span');
  t.ok(section.querySelector('h2'), 'title becomes heading with level+1');
  t.equal(section.querySelector('h2').innerHTML, 'Title. ', 'title content in heading');
});
