const { article, articleAlttitle, book } = require('./helper.js');
const tape = require('tape');

tape('Template: sec-meta => contrib-group, author-comment, abstract/title', async function (t) {
  t.plan(9);

  const document = book;
  const section = document.querySelector('#secmeta');
  t.ok(section.querySelector('p'), 'book//sec-meta//contrib-group becomes p');
  t.equal(section.querySelector('p span').innerHTML.trim(), 'comment', 'book//sec-meta//contrib-group/author-comment becomes span');
  t.ok(section.querySelector('h1'), 'title becomes h1');
  t.equal(section.querySelector('h1').innerHTML, 'Title', 'title content in heading');
  t.ok(section.querySelector('[role="doc-abstract"] h2'), 'abstract title becomes h2');

  const document2 = article;
  const secmeta = document2.querySelector('#secmeta section[data-ams-doc="sec-meta"]');
  t.ok(secmeta, 'article//sec-meta creates section data attribute');
  const secmetadl = secmeta.querySelector('dl>dt+dd[data-ams-doc-contrib]');
  t.ok(secmetadl, 'sec-meta creates DL, DT, and DD with data attribute');

  const document3 = articleAlttitle;
  const secmeta3 = document3.querySelector('#secmeta section[data-ams-doc="sec-meta"]');
  t.equal([...secmeta3.children].filter(node => node.tagName === 'DL').length, 2, 'article//sec-meta with multiple contributor types');
  t.ok(secmeta3.querySelector('section[data-ams-doc="notes"]'), 'sec-meta (non-contrib-group) child content');
});
