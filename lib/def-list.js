import mapAttributes from './mapAttributes.js';

export default (passThrough, createNode) => {
  const defList = (htmlParentNode, xmlnode) => {
    const dl = createNode('dl');
    mapAttributes(dl, xmlnode);
    // NOTE DOM let's us insert DL in p, which is invalid
    if (htmlParentNode.tagName === 'P')
      htmlParentNode.insertAdjacentElement('afterend', dl);
    else htmlParentNode.appendChild(dl);
    passThrough(dl, xmlnode);
  };
  return defList;
};
