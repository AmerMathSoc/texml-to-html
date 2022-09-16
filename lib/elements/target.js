import mapAttributes from '../helpers/mapAttributes.js';
import { replaceTeXCharactersInNodes } from '../helpers/helpers-tex.js';

export default function (htmlParentNode, xmlnode) {
  if (xmlnode.closest('tex-math')) {
    replaceTeXCharactersInNodes(xmlnode);
    htmlParentNode.insertAdjacentText('beforeend', `\\cssId{${xmlnode.id}}{`);
    this.passThrough(htmlParentNode, xmlnode);
    htmlParentNode.insertAdjacentText('beforeend', `}`);
    return;
  }
  const span = this.createNode('span');
  htmlParentNode.appendChild(span);
  mapAttributes(span, xmlnode);
  this.passThrough(span, xmlnode);
};
