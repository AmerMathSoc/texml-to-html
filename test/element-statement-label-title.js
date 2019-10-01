const path = require('path');
const xsltproc = require('./helper.js').xsltproc;
const tape = require('tape');

tape('Template: statement, label, title', async function(t) {
  t.plan(20);
  const input = path.resolve(
    __dirname,
    'element-statement-label-title--article.xml'
  );
  const document = await xsltproc(input);

  const statement1 = document.querySelector(
    'section[data-ams-doc="statement"]#id1'
  );
  t.ok(statement1, 'statement as section with data-ams-doc');
  t.equal(
    statement1.getAttribute('data-ams-doc-level'),
    '2',
    'statement data-ams-doc-level'
  );
  const statement1Heading = statement1.querySelector('h3');
  t.ok(statement1Heading, 'statement heading level in article');
  t.equal(
    statement1Heading.innerHTML,
    'Label 1 Title 1. ',
    'statement with label+title creates space before and period after title'
  );
  const statement2 = document.querySelector(
    'section[data-ams-doc="statement"]#id2'
  );
  t.ok(statement2, 'statement 2');
  t.equal(
    statement2.querySelector('h3').innerHTML,
    'Label 2. ',
    'statement with label creates period after'
  );
  const statement3 = document.querySelector(
    'section[data-ams-doc="statement"]#id3'
  );
  t.ok(statement3, 'statement 3');
  t.equal(
    statement3.querySelector('h3').innerHTML,
    'Title 3. ',
    'statement with title creates period after'
  );
  const statement4 = document.querySelector(
    'section[data-ams-doc="statement"]#id4'
  );
  t.ok(statement4, 'statement 4');
  t.equal(
    statement4.querySelector('h3').innerHTML,
    'Proof',
    'title in proof statement does not get extra period'
  );
  t.equal(
    statement4.querySelector('[data-ams-doc="secheading"]').innerHTML,
    'secheading',
    'sec-heading with title within statement'
  );
  const statement5 = document.querySelector(
    'section[data-ams-doc="statement"]#id5'
  );
  t.ok(statement5, 'statement 5');
  t.equal(
    statement5.querySelector('h3').innerHTML,
    'Label 5 Proof',
    'proof statement with label+title'
  );
  t.equal(
    statement5.querySelector('[data-ams-doc="secheading"]').innerHTML,
    'secheading',
    'sec-heading with label within statement'
  );
  const statement6 = document.querySelector(
    'section[data-ams-doc="statement"]#id6'
  );
  t.ok(statement6, 'statement 6');
  t.equal(
    statement6.querySelector('[data-ams-doc="secheading"]').innerHTML,
    'Label 6. secheading',
    'sec-heading with title+label within statement'
  );

  const input2 = path.resolve(
    __dirname,
    'element-statement-label-title--book.xml'
  );
  const document2 = await xsltproc(input2);
  const statement2_1 = document2.querySelector(
    'section[data-ams-doc="statement"]#id2'
  );
  t.ok(statement2_1, 'statement as section with data-ams-doc');
  t.ok(statement2_1.querySelector('h2'), 'statement heading level in book');

  const statement_part = document2.querySelector('section[data-ams-doc="statement"]#id4');
  t.ok(statement_part, 'statement as section with data-ams-doc');
  t.ok(statement_part.querySelector('h3'), 'statement heading level in part (in book)');
});
