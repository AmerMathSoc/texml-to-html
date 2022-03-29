import { replaceTeXCharactersInNodes } from '../helpers/helpers-tex.js';

export default (passThrough, createNode) => {
  const italic = (htmlParentNode, xmlnode) => {
    if (xmlnode.closest('tex-math')) {
      htmlParentNode.insertAdjacentText('beforeend', `\\textit{`);
      replaceTeXCharactersInNodes(xmlnode);
      passThrough(htmlParentNode, xmlnode);
      htmlParentNode.insertAdjacentText('beforeend', `}`);
      return;
    }
    const tagname = xmlnode.getAttribute('toggle') === 'yes' ? 'em' : 'i';
    const node = createNode(tagname);
    htmlParentNode.appendChild(node);
    passThrough(node, xmlnode);
  };
  return italic;
};
