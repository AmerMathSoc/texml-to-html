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

import { article, articleAlttitle, book } from './helper.js';
import tape from 'tape';

tape('Template: front/notes@notes-type=dedication', async function (t) {
  t.plan(3);

  const document = article;
  t.ok(
    document.querySelector('section[role="doc-dedication"]'),
    'notes with notes-type dedication creates section with role doc-dedication'
  );

  const document2 = book;
  t.ok(
    document2.querySelector(
      'section[data-ams-specific-use="epub-opening-page"][data-ams-content-type="publishers-note"][data-ams-doc-level="0"]'
    ),
    'notes creates section with data-ams attributes'
  );

  const document3 = articleAlttitle;
  t.ok(
    document3.querySelector('section[data-ams-doc="notes"][data-ams-content-type="article"]'),
    'notes with notes-type article'
  );
});
