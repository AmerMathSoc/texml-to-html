import mapAttributes from '../helpers/mapAttributes.js';

export default (passThrough, createNode) => {
  const target = (htmlParentNode, xmlnode) => {
    const span = createNode('span');
    htmlParentNode.appendChild(span);
    mapAttributes(span, xmlnode);
    passThrough(span, xmlnode);
  };
  return target;
};
