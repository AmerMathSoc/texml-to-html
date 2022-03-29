import { replaceTeXCharactersInNodes } from '../helpers/helpers-tex.js';

export default function (htmlParentNode, xmlnode) {
  if (xmlnode.closest('tex-math')) {
    replaceTeXCharactersInNodes(xmlnode);
    htmlParentNode.insertAdjacentText('beforeend', `\\mathsc{${xmlnode.textContent}}`); // HACK so far, all use cases without nested elements
    return;
  }

  const span = this.createNode('span', '', {
    'data-ams-style': xmlnode.tagName
  });
  htmlParentNode.appendChild(span);
  this.passThrough(span, xmlnode);
};
