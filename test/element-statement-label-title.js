const { article, book } = require('./helper.js');
const tape = require('tape');

tape('Template: statement, label, title', async function(t) {
  t.plan(23);
  const document = article;

  const statement1 = document.querySelector(
    'figure[data-ams-doc="statement"]#statement1'
  );
  t.ok(statement1, 'statement as section with data-ams-doc');
  t.equal(
    statement1.getAttribute('data-ams-doc-level'),
    '2',
    'statement data-ams-doc-level'
  );
  const statement1Heading = statement1.querySelector('figcaption');
  t.ok(statement1Heading, 'statement heading level in article');
  t.equal(
    statement1Heading.innerHTML,
    '<span data-ams-doc="label">Label 1 </span>Title 1. ',
    'statement with label+title creates space before and period after title'
  );
  const statement2 = document.querySelector(
    'figure[data-ams-doc="statement"]#statement2'
  );
  t.ok(statement2, 'statement 2');
  t.equal(
    statement2.querySelector('figcaption').innerHTML,
    'Label 2. ',
    'statement with label creates period after'
  );
  const statement3 = document.querySelector(
    'figure[data-ams-doc="statement"]#statement3'
  );
  t.ok(statement3, 'statement 3');
  t.equal(
    statement3.querySelector('figcaption').innerHTML,
    'Title 3. ',
    'statement with title creates period after'
  );
  const statementTitlePeriod = document.querySelector(
    'figure[data-ams-doc="statement"]#statement-title-period'
  );
  t.equal(
    statementTitlePeriod.querySelector('figcaption').innerHTML,
    'Title 4. ',
    'statement with title with period does not have extra period after'
  );
  const statement4 = document.querySelector(
    'figure[data-ams-doc="statement"]#statement4'
  );
  t.ok(statement4, 'statement 4');
  t.equal(
    statement4.querySelector('figcaption').innerHTML,
    'Proof. ',
    'title in proof statement now also gets extra period'
  );
  t.equal(
    statement4.querySelector('[data-ams-doc="secheading"]').innerHTML,
    'secheading',
    'sec-heading with title within statement'
  );
  const statement5 = document.querySelector(
    'figure[data-ams-doc="statement"]#statement5'
  );
  t.ok(statement5, 'statement 5');
  t.equal(
    statement5.querySelector('figcaption').innerHTML,
    '<span data-ams-doc="label">Label 5 </span>Proof. ',
    'proof statement with label+title'
  );
  t.equal(
    statement5.querySelector('[data-ams-doc="secheading"]').innerHTML,
    'secheading',
    'sec-heading with label within statement'
  );
  const statement6 = document.querySelector(
    'figure[data-ams-doc="statement"]#statement6'
  );
  t.ok(statement6, 'statement 6');
  t.equal(
    statement6.querySelector('[data-ams-doc="secheading"]').innerHTML,
    'Label 6. secheading',
    'sec-heading with title+label within statement'
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

  const statement9 = document.querySelector(
    ' #statement9'
  );
  t.equal(
    statement9.getAttribute('data-ams-doc-level'), '2',
    'statement in list item data-ams-doc-level'
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
