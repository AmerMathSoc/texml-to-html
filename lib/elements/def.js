import mapAttributes from '../helpers/mapAttributes.js';

export default (passThrough, createNode) => {
  const def = (htmlParentNode, xmlnode) => {
    const dd = createNode('dd');
    mapAttributes(dd, xmlnode);
    htmlParentNode.appendChild(dd);
    passThrough(dd, xmlnode);
  };
  return def;
};
