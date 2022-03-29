import { replaceTeXCharactersInNodes } from '../helpers/helpers-tex.js';

export default (passThrough, createNode) => {
  const tagToDataStyle = (htmlParentNode, xmlnode) => {
    if (xmlnode.closest('tex-math')) {
      replaceTeXCharactersInNodes(xmlnode);
      htmlParentNode.insertAdjacentText('beforeend', `\\mathsc{${xmlnode.textContent}}`); // HACK so far, all use cases without nested elements
      return;
    }

    const span = createNode('span', '', {
      'data-ams-style': xmlnode.tagName
    });
    htmlParentNode.appendChild(span);
    passThrough(span, xmlnode);
  };
  ;
  return tagToDataStyle;
};
