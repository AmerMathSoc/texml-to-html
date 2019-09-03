const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('def-list, def-item, def, term', async function(t) {
  t.plan(6);
  const input = path.resolve(
    __dirname,
    'element-def-list-def-item-def-term--article.xml'
  );
  const document = await xsltproc(input);

  const deflist = document.querySelector('section[data-ams-doc="article"] dl');
  t.ok(deflist, 'Def-list');
  const defitem = deflist.firstElementChild;
  t.equal(defitem.tagName, 'DIV', 'Def-item in article');
  t.ok(deflist.querySelector('div>dt'), 'Term');
  t.equal(deflist.querySelector('div>dt').id, 'item1', 'Def-list ID moved to DT')
  t.ok(deflist.querySelector('div>dt+dd'), 'Def')
  const input2 = path.resolve(
    __dirname,
    'element-def-list-def-item-def-term--book.xml'
  );
  const document2 = await xsltproc(input2);
  t.equal(document2.querySelector('dl').firstElementChild.tagName, 'DT', 'Def-item in book')
});
