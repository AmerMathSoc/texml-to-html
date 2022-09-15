
import { article } from './helper.js';
import tape from 'tape';

tape('table-wrap element', async function (t) {
    t.plan(1);
    const document = article;
    t.ok(
        document.querySelector('figure[data-ams-doc="table-wrap"]'),
        `table-wrap element as figure`
    );
});
