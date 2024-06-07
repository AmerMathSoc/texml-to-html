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


tape('Hacks', async function (t) {
    t.plan(5);
    const document = article;

    // moved from test/element-def-list-def-item-def-term.js (for the old def-list.js hack of "move DL after its P parent")
    const wrappingParagraph = document.querySelector('#hacks p');
    const firstDL = document.querySelector('#hacks dL');
    t.equal(wrappingParagraph.innerHTML.trim(), 'text node', 'paragraph text remains');
    t.ok(wrappingParagraph.nextElementSibling === firstDL, 'DL is placed after parent if XML parent is paragraph');

    // Note. the old def-list.js hack ("move DL after its P parent") was inverting the order (e.g., when there are 2 DLs in the P)
    const firstDT = firstDL.querySelector('dt');
    t.equal(firstDT.innerHTML, '1', 'DLs moved out of paragraph appear in the correct oder');

    t.equal(document.querySelectorAll('#hacks > p').length, 1, 'If paragraph is empty after postprocessing, it is removed.')
    
    t.equal(document.querySelector('cite-group').parentNode.tagName, 'P', 'Custom elements remain in paragraph');
});

