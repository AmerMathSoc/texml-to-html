const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: fig, fig-group, caption, label', async function(t) {
  t.plan(6);
  const input = path.resolve(__dirname, 'element-fig-subfig-label.xml');
  const document = await xsltproc(input);
  const labels = document.querySelectorAll('strong');
  t.equal(labels[0].innerHTML, 'Label 1. ', 'Fig label with caption gets period');
  t.equal(labels[1].innerHTML, 'Grouplabel 1. ', 'Fig-group label with caption gets period');
  t.equal(labels[2].innerHTML,'(Sublabel 1) ', 'Subfigure label with caption gets parentheses');
  t.equal(labels[3].innerHTML,'Label 2. ', 'Fig label without caption gets period');
  t.equal(labels[4].innerHTML, 'Grouplabel 2. ', 'Fig-group label without caption gets period');
  t.equal(labels[5].innerHTML, '(Sublabel 2) ', 'Subfigure label without caption gets parentheses');
});
