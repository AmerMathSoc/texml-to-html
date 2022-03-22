import { replaceTeXCharactersInNodes } from './helpers-tex.js';

export default (passThrough, createNode) => {
  const bold = (htmlParentNode, xmlnode) => {
    if (xmlnode.closest('tex-math')) {
      htmlParentNode.insertAdjacentText('beforeend', `\\textbf{`);
      replaceTeXCharactersInNodes(xmlnode);
      passThrough(htmlParentNode, xmlnode);
      htmlParentNode.insertAdjacentText('beforeend', `}`);
      return;
    }
    const node = createNode('strong');
    htmlParentNode.appendChild(node);
    passThrough(node, xmlnode);
  };
  return bold;
};
