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

tape('table-wrap-group element', async function (t) {
    t.plan(3);
    const document = article;
    const tableWrapGroup = document.querySelector('figure[data-ams-doc="table-wrap-group"]');
    t.ok(tableWrapGroup, 'table-wrap element as figure');
    t.equal(tableWrapGroup.querySelector('figcaption > strong').innerHTML, 'Table with subtables', 'table-wrap-group caption');
    t.equal(
        tableWrapGroup.querySelector('figure[data-ams-doc="table-wrap"] > figcaption > strong').innerHTML, 'a', 'table-wrap label'
    );
});
