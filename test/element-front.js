/*!
 *  Copyright (c) 2023 American Mathematical Society
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */


import { article, articleAlttitle, articleNometa } from './helper.js';
import tape from 'tape';

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const jsonSnapshot = require('./article-meta-snapshot.json');
const jsonSnapshot2 = require('./article-alttitle-meta-snapshot.json');
const jsonSnapshot3 = require('./article-nometa-meta-snapshot.json');

tape('front.js', async function (t) {
  t.plan(5);

  const document = article;
  const frontmatter = document.querySelector('section[data-ams-doc="frontmatter"]');
  t.ok(frontmatter, 'front creates section with data-ams-doc=frontmatter');

  const jsonScript = frontmatter.querySelector('script[type="application/json"]');
  const jsonData = JSON.parse(jsonScript.textContent);

  t.deepEqual(jsonData, jsonSnapshot, 'article.xml JSON metadata');

  t.equal(frontmatter.querySelector('h1').innerHTML, 'article-title', 'Article title as h1 in HTML')

  const document2 = articleAlttitle;
  t.deepEqual(JSON.parse(document2.querySelector('script[type="application/json"]').textContent), jsonSnapshot2, 'article--alttitle.xml JSON metadata');

  const document3 = articleNometa;
  t.deepEqual(JSON.parse(document3.querySelector('script[type="application/json"]').textContent), jsonSnapshot3, 'article--nometa.xml JSON metadata');
});
