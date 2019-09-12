const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: book-title-group, title, subtitle', async function(t) {
  t.plan(5);

  const input = path.resolve(__dirname, 'element-book-title-group.xml');
  const document = await xsltproc(input);
  const titlegroup = document.querySelector('header');
  t.ok(titlegroup, 'book-title-group to header');
  const title = titlegroup.firstElementChild;
  t.equal(title.tagName, 'H1', 'title to h1');
  t.equal(title.innerHTML, 'title', 'h1 with title contents');

  const subtitle = title.nextElementSibling;
  t.equal(subtitle.tagName, 'P', 'title followed by p for subtitle');
  t.equal(subtitle.innerHTML, 'subtitle', 'subtitle with subtitle content');

});
