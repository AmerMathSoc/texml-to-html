import { article } from './helper.js';
import tape from 'tape';

tape('Template: statement, label, title', async function (t) {
    t.plan(1);

    t.equal(
        article.querySelector('[data-ams-doc="secheading"][id="statement4secheading"][data-ams-specific-use="subsection"][data-ams-doc-level="2"]').innerHTML,
        'secheading',
        'secheading with title within statement'
    );
});
