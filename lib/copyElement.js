import mapAttributes from './mapAttributes.js';

export default (passThrough, createNode) => {
  const copyElement = (htmlParentNode, xmlnode) => {
    const copy = createNode(xmlnode.tagName);
    htmlParentNode.appendChild(copy);
    mapAttributes(copy, xmlnode);
    passThrough(copy, xmlnode);
  };
  return copyElement;
};
