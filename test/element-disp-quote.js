
import { article } from './helper.js';
import tape from 'tape';


tape('Template: disp-quote, disp-quote/attrib', async function(t) {
  t.plan(4);
  const document = article;
  const quotes = document.querySelectorAll('blockquote[data-ams-style="use"]');
  t.ok(quotes[0], 'disp-quote with specific-use to blockquote with data-ams-style');
  t.ok(quotes[0].querySelector('footer span'), 'attrib in disp-quote as footer with span');
  t.notEqual(quotes[1].parentNode.tagName, 'P', 'blockquote moved out of paragraph to avoid invalid HTML');
  t.ok(document.querySelector('blockquote[role="doc-epigraph"]'), 'Epigraphs get role');
});

