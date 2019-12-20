const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('def-list, def-item, def, term', async function(t) {
  t.plan(7);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);

  const wrappingParagraph = document.querySelector(
    'section[data-ams-doc="article"] p#dlistp'
  );
  const deflist = document.querySelector(
    'section[data-ams-doc="article"] dl#dlist1'
  );
  t.ok(deflist, 'Def-list');
  t.ok(
    wrappingParagraph.nextElementSibling === deflist,
    'DL is placed after parent if XML parent is paragraph'
  );
  const defitem = deflist.firstElementChild;
  t.equal(defitem.tagName, 'DIV', 'Def-item in article');
  t.ok(deflist.querySelector('div>dt'), 'Term');
  t.equal(
    deflist.querySelector('div>dt').id,
    'ditem1',
    'Def-list ID moved to DT'
  );
  t.ok(deflist.querySelector('div>dt+dd'), 'Def');
  const input2 = path.resolve(__dirname, 'book.xml');
  const document2 = await xsltproc(input2);
  t.equal(
    document2.querySelector('dl#dlist1').firstElementChild.tagName,
    'DT',
    'Def-item in book'
  );
});
