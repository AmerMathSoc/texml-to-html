
import { article } from './helper.js';
import tape from 'tape';


tape('Template: target', async function(t) {
  t.plan(2);
  const document = article;
  const targetSpan = document.querySelector('section[data-ams-doc="article"] span#target');
  t.ok(targetSpan, 'Convert to span inside article');

  // target in tex-math
  const equationsBlock = [...document.querySelectorAll('[data-ams-doc="math block"]>tex-math')];
  t.ok(equationsBlock.find(node => node.innerHTML === '\\cssId{targetMath}{_\\tag{$x$}}'), 'Convert to \\cssId inside tex-math');

});

