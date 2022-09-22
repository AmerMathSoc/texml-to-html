
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
        tableLabel.innerHTML, 'Table 1. ',
        `first child of table caption is table label`
    );
});
