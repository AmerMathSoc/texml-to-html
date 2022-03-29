import { replaceTeXCharactersInNodes } from '../helpers/helpers-tex.js';

export default function (htmlParentNode, xmlnode) {
    if (xmlnode.closest('tex-math')) {
      htmlParentNode.insertAdjacentText('beforeend', `\\textit{`);
      replaceTeXCharactersInNodes(xmlnode);
      this.passThrough(htmlParentNode, xmlnode);
      htmlParentNode.insertAdjacentText('beforeend', `}`);
      return;
    }
    const tagname = xmlnode.getAttribute('toggle') === 'yes' ? 'em' : 'i';
    const node = this.createNode(tagname);
    htmlParentNode.appendChild(node);
    this.passThrough(node, xmlnode);
  };
