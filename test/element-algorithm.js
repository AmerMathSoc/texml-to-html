
import { article } from './helper.js';
import tape from 'tape';


tape('Element: alg:* elements', async function (t) {
      t.plan(10);
    const document = article;
    // alg:algorithm
    const algorithm = document.querySelector('alg-algorithm');
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
});

