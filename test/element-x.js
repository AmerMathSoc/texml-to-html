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


import { article, book } from './helper.js';
import tape from 'tape';


tape('Template: x', async function(t) {
  t.plan(4);
  const document = article;
  t.equal(document.querySelector('a[href="#rid5"][data-ams-ref="type"]').innerHTML, 'Context ref', 'xref with generic type with x child preserved');
  t.equal(document.querySelector('cite a[href="#rid4"][data-ams-ref="bibr"][role="doc-biblioref"]').innerHTML, 'ref, note', 'xref with ref-type bibr with x child preserve');
  t.equal(document.querySelector('p#pwithx').innerHTML, 'Is  ignored.', 'x in article is ignored');
  const document2 = book;
  t.equal(document2.querySelector('p#pwithx').innerHTML, 'Is not ignored.', 'x in book is preserved');
});
