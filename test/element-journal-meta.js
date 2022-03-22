import { article, articleAlttitle, articleNometa } from './helper.js';
import tape from 'tape';

tape('Template: journal-meta, ...', async function(t) {
  t.plan(4);
  const document = article;
  let jmeta = {};
  document.querySelectorAll('section[data-ams-doc="copyright-page"] dt').forEach( node => {if (node.innerHTML === 'Journal Information') jmeta = node.nextElementSibling} );
  t.equal(jmeta.innerHTML.trim(), '<a href="href">journal-title</a>, <span>Volume volume</span>, <span>Issue issue</span>, ISSN <span>print</span>, published by the <span>publisher-name</span>, <span>publisher-loc</span>.', 'journal-meta content derived from self-uri, journal-title, volume, issue, issn, publisher-name, publisher-loc');  // NOTE We need to check this and checking each derived piece would not add more value

  const document2 = articleAlttitle;
  const jvol2 = document2.querySelector('[data-ams-doc="journal volume"]');
  t.equal(jvol2.innerHTML, 'Volume , ')
  const jissue2 = document2.querySelector('[data-ams-doc="journal issue"]');
  t.equal(jissue2.innerHTML, 'Issue ')
  const document3 = articleNometa;
  t.ok(document3, 'Article without meta data');
});
