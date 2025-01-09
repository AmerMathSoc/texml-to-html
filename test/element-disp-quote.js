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


tape('Template: disp-quote, disp-quote/attrib', async function(t) {
  t.plan(5);
  const document = article;
  const quotes = document.querySelectorAll('blockquote[data-ams-style="use"]');
  t.ok(quotes[0], 'disp-quote with specific-use to blockquote with data-ams-style');
  t.ok(quotes[0].querySelector('footer span'), 'attrib in disp-quote as footer with span');
  t.equal(quotes[0].lastElementChild.tagName, 'FOOTER', 'disp-quote footer last child');
  t.notEqual(quotes[1].parentNode.tagName, 'P', 'blockquote moved out of paragraph to avoid invalid HTML');
  t.ok(document.querySelector('blockquote[role="doc-epigraph"]'), 'Epigraphs get role');
});

