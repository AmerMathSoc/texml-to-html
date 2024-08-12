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

tape('Template: statement, label, title', async function(t) {
  t.plan(20);
  const document = article;

  const statement1 = document.querySelector(
    'figure[data-ams-doc="statement"]#statement1'
  );
  t.ok(statement1, 'statement as section with data-ams-doc');
  const statement1Heading = statement1.querySelector('figcaption');
  t.ok(statement1Heading, 'statement heading level in article');
  t.equal(
    statement1Heading.innerHTML,
    '<span data-ams-doc="label">Label 1</span> <span data-ams-doc="title">Title 1</span>',
    'statement with label+title creates space before and period after title'
  );
  const statement2 = document.querySelector(
    'figure[data-ams-doc="statement"]#statement2'
  );
  t.ok(statement2, 'statement 2');
  t.equal(
    statement2.querySelector('figcaption').innerHTML,
    '<span data-ams-doc="label">Label 2</span>',
    'statement with label creates period after'
  );
  const statement3 = document.querySelector(
    'figure[data-ams-doc="statement"]#statement3'
  );
  t.ok(statement3, 'statement 3');
  t.equal(
    statement3.querySelector('figcaption').innerHTML,
    '<span data-ams-doc="title">Title 3</span>',
    'statement with title creates period after'
  );
  const statementTitlePeriod = document.querySelector(
    'figure[data-ams-doc="statement"]#statement-title-period'
  );
  t.equal(
    statementTitlePeriod.querySelector('figcaption').innerHTML,
    '<span data-ams-doc="title">Title 4.</span>',
    'statement with title with period does not have extra period after'
  );
  const statement4 = document.querySelector(
    'figure[data-ams-doc="statement"]#statement4'
  );
  t.ok(statement4, 'statement 4');
  t.equal(
    statement4.querySelector('figcaption').innerHTML,
    '<span data-ams-doc="title">Proof</span>',
    'title in proof statement now also gets extra period'
  );
  const statement5 = document.querySelector(
    'figure[data-ams-doc="statement"]#statement5'
  );
  t.ok(statement5, 'statement 5');
  t.equal(
    statement5.querySelector('figcaption').innerHTML,
    '<span data-ams-doc="label">Label 5</span> <span data-ams-doc="title">Proof</span>',
    'proof statement with label+title'
  );
  t.equal(
    statement5.querySelector('[data-ams-doc="secheading"]').innerHTML,
    'secheading',
    'secheading with label within statement'
  );
  const statement6 = document.querySelector(
    'figure[data-ams-doc="statement"]#statement6'
  );
  t.ok(statement6, 'statement 6');
  t.equal(
    statement6.querySelector('[data-ams-doc="secheading"]').innerHTML,
    'Label 6<ams-x>.</ams-x> secheading',
    'secheading with title+label within statement'
  );

  const statement7 = document.querySelector(
    'figure[data-ams-doc="statement"]#statement7'
  );
  const statement8 = statement7.querySelector(
    ' #statement8'
  );
  t.equal(
    statement8.getAttribute('data-ams-doc-level'), statement7.getAttribute('data-ams-doc-level'),
    'nested statement does not increase data-ams-doc-level'
  );

  const document2 = book;
  const statement2_1 = document2.querySelector(
    'figure[data-ams-doc="statement"]#statement2'
  );
  t.ok(statement2_1, 'statement as section with data-ams-doc');
  t.ok(statement2_1.querySelector('figcaption'), 'statement heading level in book');

  const statement_part = document2.querySelector(
    'figure[data-ams-doc="statement"]#statement4'
  );
  t.ok(statement_part, 'statement as section with data-ams-doc');
  t.ok(
    statement_part.querySelector('figcaption'),
    'statement heading level in part (in book)'
  );
});
