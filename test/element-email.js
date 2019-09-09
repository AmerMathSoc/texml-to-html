const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: email', async function(t) {
  t.plan(2);
  const input = path.resolve(
    __dirname,
    'element-email.xml'
  );
  const document = await xsltproc(input);
  console.log(document.body.innerHTML);
  const email = document.querySelector('a[href="mailto://address1"]');
  t.equal(email.outerHTML, '<a href="mailto://address1">address1</a>', 'email to anchor with mailto address');
  t.equal(email.nextSibling.textContent, ', ', 'multiple email elements are separated by comma');
});
