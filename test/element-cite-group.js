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


tape('Template: cite-group', async function (t) {
  t.plan(2);

  t.equal(article.querySelector('cite-group').outerHTML, '<cite-group><ams-x>[</ams-x><cite><a role="doc-biblioref" data-ams-ref="bibr" href="#bibr-AEG0">AEG08<cite-detail><ams-x>, </ams-x>Section 5</cite-detail></a></cite><ams-x>; </ams-x><cite><a role="doc-biblioref" data-ams-ref="bibr" href="#bibr-AEG0">AEG08</a></cite><ams-x>]</ams-x></cite-group>', 'cite-group in article');
  t.equal(book.querySelector('cite-group').outerHTML, '<cite-group><ams-x>[</ams-x><cite><a role="doc-biblioref" data-ams-ref="bibr" href="#bibr-AEG0">AEG08<cite-detail><ams-x>, </ams-x>Section 5</cite-detail></a></cite><ams-x>; </ams-x><cite><a role="doc-biblioref" data-ams-ref="bibr" href="#bibr-AEG0">AEG08</a></cite><ams-x>]</ams-x></cite-group>', 'cite-group in book');

});
