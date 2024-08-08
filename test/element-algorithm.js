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


tape('Element: alg:* elements', async function (t) {
      t.plan(15);
    const document = article;
    // alg:algorithm
    const algorithms = document.querySelectorAll('alg-algorithm');
    const algorithm = algorithms[0];
    t.ok(algorithm, 'alg-algorithm element');
    t.equal(algorithm.getAttribute('data-ams-alg-linenodelimiter'), ':', 'alg-algorithm element');
    // alg:line
    const algLines = document.querySelectorAll('alg-line');
    t.equal(algLines[0].previousElementSibling.tagName, 'ALG-LINENO', 'alg-line preceded by alg-lineno');
    t.equal(algLines[0].previousElementSibling.innerHTML, '', 'alg-line with empty line number');
    t.ok(algLines[0].hasAttribute('data-ams-alg-spanslineno'), 'alg-line with data-ams-alg-spanslineno');
    t.equal(algLines[3].previousElementSibling.innerHTML, '3:', 'alg-line with proper line number');
    // alg:statement
    const algStatement = document.querySelector('alg-statement');
    t.ok(algStatement, 'alg:statement');
    // alg:algComment
    const algComment = document.querySelector('alg-comment');
    t.ok(algComment, 'alg:comment');
    // alg:block
    const algBlock = document.querySelector('alg-block');
    t.equal(algBlock.getAttribute('data-ams-alg-blocklevel'), '1', 'alg:block data-ams-alg-blocklevel');
    const algBlockNested = document.querySelector('alg-block > alg-block');
    t.equal(algBlockNested.getAttribute('data-ams-alg-blocklevel'), '2', 'Nested alg:block data-ams-alg-blocklevel');
    // pass-through elements
    const cond = [...algorithm.querySelectorAll('alg-line > alg-statement')].find(node => node.textContent.trim() === 'if condition then');
    t.ok(cond, 'alg:condition (and thus alg:if) pass through');
    const fr = [...algorithm.querySelectorAll('alg-line > alg-statement > *:first-of-type')].find(node => node.textContent === 'for');
    t.ok(fr, 'alg:for pass through');
    const func = [...algorithm.querySelectorAll('alg-line > alg-statement > *:first-of-type')].find(node => node.textContent === 'Function');
    t.ok(func, 'alg:function pass through');
    const proc = [...algorithm.querySelectorAll('alg-line > alg-statement > *:first-of-type')].find(node => node.textContent === 'Procedure');
    t.ok(proc, 'alg:procedure pass through');

    // algorithm with no/empty line delimiter attribute
    t.equal(algorithms[1].querySelector('alg-lineno').innerHTML, '1', 'alg-lineno without line number delimiter on algorithm root');
});

