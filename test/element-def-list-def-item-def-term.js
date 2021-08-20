const { article, book } = require('./helper.js');
const tape = require('tape');

tape('def-list, def-item, def, term', async function(t) {
  t.plan(7);
  const document = article;

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
  const document2 = book;
  t.equal(
    document2.querySelector('dl#dlist1').firstElementChild.tagName,
    'DIV',
    'Def-item in book'
  );
});
