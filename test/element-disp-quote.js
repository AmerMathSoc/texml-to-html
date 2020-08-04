const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');


tape('Template: disp-quote, disp-quote/attrib', async function(t) {
  t.plan(4);
  const input = path.resolve(__dirname, 'article.xml');
  const document = await xsltproc(input);
  const quotes = document.querySelectorAll('blockquote[data-ams-style="use"]');
  t.ok(quotes[0], 'disp-quote with specific-use to blockquote with data-ams-style');
  t.ok(quotes[0].querySelector('footer span'), 'attrib in disp-quote as footer with span');
  t.notEqual(quotes[1].parentNode.tagName, 'P', 'blockquote moved out of paragraph to avoid invalid HTML');
  t.ok(document.querySelector('blockquote[role="doc-epigraph"]'), 'Epigraphs get role');
});

