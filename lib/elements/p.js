import mapAttributes from '../helpers/mapAttributes.js';

export default function (htmlParentNode, xmlnode) {
  let paragraph = this.createNode('p');
  mapAttributes(paragraph, xmlnode);
  htmlParentNode.appendChild(paragraph);
  this.passThrough(paragraph, xmlnode);
};
