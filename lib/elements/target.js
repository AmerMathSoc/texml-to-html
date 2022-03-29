import mapAttributes from '../helpers/mapAttributes.js';

export default function (htmlParentNode, xmlnode) {
  const span = this.createNode('span');
  htmlParentNode.appendChild(span);
  mapAttributes(span, xmlnode);
  this.passThrough(span, xmlnode);
};
