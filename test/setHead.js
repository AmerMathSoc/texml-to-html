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


import { article, articleNometa } from './helper.js';
import tape from 'tape';


tape('setHead()', async function (t) {
  t.plan(5);
  const document = article;
  t.equal(document.head.firstChild, document.head.querySelector('meta[charset="utf-8"]'), 'First child of head is a meta tag');
  t.ok(document.head.querySelector('meta[content="width=device-width, initial-scale=1"][name="viewport"]'), 'viewport metatag');
  t.equal(document.documentElement.getAttribute('lang'), 'en', 'Language attribute on html tag');
  t.equal(document.documentElement.getAttribute('dir'), 'ltr', 'Directionality attribute on html tag');

  const document2 = articleNometa;
  t.equal(document2.querySelector('html').getAttribute('lang'), 'fr', 'Language attribute on html tag (not the default)');
});
