import mapAttributes from './mapAttributes.js';
import { mapColorAttributes } from './mapColorAttributes.js';

export default (passThrough, createNode) => {
  const boxedText = (htmlParentNode, xmlnode) => {
    const node = createNode('div', '', { 'data-ams-style': 'boxed' });
    htmlParentNode.appendChild(node);
    mapAttributes(node, xmlnode);
    mapColorAttributes(node, xmlnode);
    passThrough(node, xmlnode);
  };
  return boxedText;
};
