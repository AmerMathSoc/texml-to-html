const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: sec-meta => contrib-group, author-comment, abstract/title', async function(t) {
  t.plan(7);

  const input = path.resolve(__dirname, 'book.xml');
  const document = await xsltproc(input);
  const section = document.querySelector('#secmeta');
  t.ok(section.querySelector('p'), 'book//sec-meta//contrib-group becomes p');
  t.equal(section.querySelector('p span').innerHTML.trim(), 'comment', 'book//sec-meta//contrib-group/author-comment becomes span');
  t.ok(section.querySelector('h1'), 'title becomes h1');
  t.equal(section.querySelector('h1').innerHTML, 'Title', 'title content in heading');
  t.ok(section.querySelector('[role="doc-abstract"] h2'), 'abstract title becomes h2');

  const input2 = path.resolve(__dirname, 'article.xml');
  const document2 = await xsltproc(input2);
  const secmeta = document2.querySelector('#secmeta section[data-ams-doc="sec-meta"]');
  t.ok(secmeta, 'article//sec-meta creates section data attribute');
  const secmetadl = secmeta.querySelector('dl>dt+dd[data-ams-doc-contrib]');
  t.ok(secmetadl, 'sec-meta creates DL, DT, and DD with data attribute');
});