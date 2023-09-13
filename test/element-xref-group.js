
import { article } from './helper.js';
import tape from 'tape';


tape('Template: xref-group', async function (t) {
    t.plan(1);
    const xrefGroup = article.querySelector('#xrefgroup [data-ams-doc="refgroup"]');
    t.equal(xrefGroup.outerHTML, '<span data-ams-refrange="xrefgroup2 xrefgroup3" data-ams-ref="grp" data-ams-doc="refgroup"><a data-ams-ref="grp" href="#xrefgroup1">2</a>–<a data-ams-ref="grp" href="#xrefgroup4">5</a></span>', 'xrefgroup snapshot test')
});
