const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: disp-quote, disp-quote/attrib', async function(t) {
  t.plan(2);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  const quote = document.querySelector('blockquote[data-ams-style="use"]');
  t.ok(quote, 'disp-quote with specific-use to blockquote with data-ams-style');
  t.ok(quote.querySelector('footer span'), 'attrib in disp-quote as footer with span');
});

