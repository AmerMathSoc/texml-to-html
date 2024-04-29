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


import { article } from './helper.js';
import tape from 'tape';


tape('Template: xref', async function(t) {
  t.plan(6);
  const document = article;
  t.ok(document.querySelector('a[href="#rid1"][data-ams-ref="type"]'), 'xref as anchor with href, data-ams-ref');
  t.ok(document.querySelector('a[href="#rid2"][data-ams-ref="fn"][role="doc-noteref"]'), 'xref with ref-type fn has role doc-noteref');
  t.equal(document.querySelector('a[data-ams-ref="fn"]').firstElementChild.tagName, 'SUP', 'xref with ref-type fn has firstChild sup');
  t.ok(document.querySelector('cite a[href="#rid3"][data-ams-ref="bibr"][role="doc-biblioref"]'), 'xref with ref-type bibr a cite with anchor with href, data-ams-ref, role doc-biblioref');
  t.ok(document.querySelector('span[data-ams-ref="notrid"]'), 'xref without rid as span with data-ams-ref notrid');
  t.equal(document.querySelector('a[data-ams-ref="nested"]').outerHTML, '<a data-ams-ref="nested" href="#rid6"><span data-ams-href="https://nested"></span></a>', 'xref with ext-link inside: nested link flattened');
});
