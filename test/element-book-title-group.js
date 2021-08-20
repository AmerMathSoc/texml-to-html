const { book } = require('./helper.js');
const tape = require('tape');

tape('Template: book-title-group, title, subtitle', async function(t) {
  t.plan(5);

  const document = book;
  const titlegroup = document.querySelector('header');
  t.ok(titlegroup, 'book-title-group to header');
  const title = titlegroup.firstElementChild;
  t.equal(title.tagName, 'H1', 'title to h1');
  t.equal(title.innerHTML, 'title', 'h1 with title contents');

  const subtitle = title.nextElementSibling;
  t.equal(subtitle.tagName, 'P', 'title followed by p for subtitle');
  t.equal(subtitle.innerHTML, 'subtitle', 'subtitle with subtitle content');
});
