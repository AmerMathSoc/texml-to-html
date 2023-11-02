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

tape('def-list, def-item, def, term', async function(t) {
  t.plan(6);
  const document = article;

  const deflist = document.querySelector(
    'section[data-ams-doc="article"] dl#dlist1'
  );
  t.ok(deflist, 'Def-list');
  const defitem = deflist.firstElementChild;
  t.equal(defitem.tagName, 'DIV', 'Def-item in article');
  t.ok(deflist.querySelector('div>dt'), 'Term');
  t.equal(
    deflist.querySelector('div>dt').id,
    'ditem1',
    'Def-list ID moved to DT'
  );
  t.ok(deflist.querySelector('div>dt+dd'), 'Def');
  const document2 = book;
  t.equal(
    document2.querySelector('dl#dlist1').firstElementChild.tagName,
    'DIV',
    'Def-item in book'
  );
});
