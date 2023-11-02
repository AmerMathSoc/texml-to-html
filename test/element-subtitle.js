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


import { article, articleAlttitle } from './helper.js';
import tape from 'tape';

tape('subtitle', async function (t) {
  t.plan(3);
  const document = article;

  const subtitle = document.querySelector('p[data-ams-doc="subtitle"]');
  t.ok(subtitle, 'section subtitle to p with data-ams-doc');

  const document2 = articleAlttitle;
  const articleSubtitle = document2.querySelector('p[data-ams-doc="subtitle"]');
  t.equal(
    articleSubtitle.previousElementSibling.tagName, 'H1',
    'article-level subtitle in content follows title'
  );
  const jsonData = JSON.parse(document2.querySelector('script[type="application/json"]').textContent);
  t.equal(jsonData.subtitle, articleSubtitle.innerHTML, 'article-level subtitle in metadata matches in content');
});
