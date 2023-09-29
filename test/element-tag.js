
import { article } from './helper.js';
import tape from 'tape';


tape('Template: tag', async function (t) {
  t.plan(4);
  const document = article;

  const equationsBlock = [...document.querySelectorAll('[data-ams-doc="math block"] > tex-math')];

  t.ok(equationsBlock.find(node => node.innerHTML === '\\cssId{targetMath}{_\\tag{$x$}}'), 'Tag with tex-math');

  const tagStar = equationsBlock.find(node => node.innerHTML === '\\tag*{tag*}')
  t.ok(tagStar, 'Tag with parens="no"');

  // tag extraction
  t.notOk(tagStar.hasAttribute('data-ams-tags'), 'No extracted tags if none are linked to');
  t.equal(equationsBlock.find(node => node.innerHTML === '\\tag{PlainTag}\\cssId{targetMath2}{\\tag{$\\mathbb{N}$}}\\cssId{targetMath3}{\\tag{TextTag}}').getAttribute('data-ams-tags'), '["PlainTag","$\\\\mathbb{N}$","TextTag"]', 'All tags stored in attribute if one was linked to');

});

