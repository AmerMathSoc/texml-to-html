const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('"copied" elements', async function(t) {
  const copyElements = [
    'sup',
    'sub',
    'table',
    'tbody',
    'thead',
    'th',
    'tr',
    'td',
    'pre',
    'hr'
  ];
  t.plan(copyElements.length);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  copyElements.forEach(selector =>
    t.ok(document.querySelector(selector), `${selector} copied to output`)
  );
});
