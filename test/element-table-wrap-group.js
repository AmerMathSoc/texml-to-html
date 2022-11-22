
import { article } from './helper.js';
import tape from 'tape';

tape('table-wrap-group element', async function (t) {
    t.plan(3);
    const document = article;
    const tableWrapGroup = document.querySelector('figure[data-ams-doc="table-wrap-group"]');
    t.ok(tableWrapGroup, 'table-wrap element as figure');
    t.equal(tableWrapGroup.querySelector('figcaption > strong').innerHTML, 'Table with subtables. ', 'table-wrap-group caption');
    t.equal(
        tableWrapGroup.querySelector('figure[data-ams-doc="table-wrap"] > figcaption > strong').innerHTML, '(a) ', 'table-wrap label'
    );
});
