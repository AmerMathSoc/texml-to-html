
const { article } = require('./helper.js');
const tape = require('tape');


tape('Template: fig, fig-group, caption, label', async function(t) {
  t.plan(9);
  const document = article;
  const figurePosition = document.querySelector('#figures figure#position');
  t.equal(figurePosition.getAttribute('data-ams-position'), 'anchor', 'Figure with data-ams-position attribute');
  t.notOk(figurePosition.getAttribute('role'), 'Figure has no explicit role');
  const labels = document.querySelectorAll('#figures figure strong');
  t.equal(labels[0].innerHTML, 'Label 1. ', 'Fig label with caption gets period');
  t.equal(labels[1].innerHTML, 'Grouplabel 1. ', 'Fig-group label with caption gets period');
  t.equal(labels[2].innerHTML,'(Sublabel 1) ', 'Subfigure label with caption gets parentheses');
  t.equal(labels[3].innerHTML,'Label 2. ', 'Fig label without caption gets period');
  t.equal(labels[4].innerHTML, 'Grouplabel 2. ', 'Fig-group label without caption gets period');
  t.equal(labels[5].innerHTML, '(Sublabel 2) ', 'Subfigure label without caption gets parentheses');
  t.notOk(figurePosition.nextElementSibling.hasAttribute('id'), 'Fig without id does not create a (bad) id');
});
