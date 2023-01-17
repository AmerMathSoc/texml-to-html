
import { article, articleAlttitle, articleNometa } from './helper.js';
import tape from 'tape';

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const jsonSnapshot = require('./article-meta-snapshot.json');
const jsonSnapshot2 = require('./article-alttitle-meta-snapshot.json');
const jsonSnapshot3 = require('./article-nometa-meta-snapshot.json');

tape('front.js', async function (t) {
  t.plan(4);

  const document = article;
  const frontmatter = document.querySelector('section[data-ams-doc="frontmatter"]');
  t.ok(frontmatter, 'front creates section with data-ams-doc=frontmatter');

  const jsonScript = frontmatter.querySelector('script[type="application/json"]');
  const jsonData = JSON.parse(jsonScript.textContent);

  t.deepEqual(jsonData, jsonSnapshot, 'article.xml JSON metadata');


  const document2 = articleAlttitle;
  t.deepEqual(JSON.parse(document2.querySelector('script[type="application/json"]').textContent), jsonSnapshot2, 'article--alttitle.xml JSON metadata');

  const document3 = articleNometa;
  t.deepEqual(JSON.parse(document3.querySelector('script[type="application/json"]').textContent), jsonSnapshot3, 'article--nometa.xml JSON metadata');
});
