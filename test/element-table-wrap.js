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

tape('table-wrap element', async function (t) {
    t.plan(6);
    const document = article;
    const tableWrap = document.querySelector('figure[data-ams-doc="table-wrap"]');
    t.ok(
        tableWrap,
        `table-wrap element as figure`
    );
    const tableCaption = tableWrap.querySelector('figcaption');
    t.ok(
        tableCaption,
        `table caption as figcaption`
    );
    t.equal(
        tableWrap.firstElementChild, tableCaption,
        `first child of table is table caption `
    );
    const tableLabel = tableCaption.querySelector('strong')
    t.ok(
        tableLabel,
        `table label in caption as strong element`
    );
    t.equal(
        tableCaption.firstChild, tableLabel,
        `first child of table caption is table label`
    );
    t.equal(
        tableLabel.innerHTML, 'Table 1',
        `first child of table caption is table label`
    );
});
