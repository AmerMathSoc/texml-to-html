import { article } from './helper.js';
import tape from 'tape';


tape('Hacks', async function (t) {
    t.plan(4);
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
});

