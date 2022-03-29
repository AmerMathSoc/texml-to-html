import mapAttributes from '../helpers/mapAttributes.js';

export default function (htmlParentNode, xmlnode) {
  const copy = this.createNode(xmlnode.tagName);
  htmlParentNode.appendChild(copy);
  mapAttributes(copy, xmlnode);
  this.passThrough(copy, xmlnode);
};
