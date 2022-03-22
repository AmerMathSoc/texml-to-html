import mapAttributes from './mapAttributes.js';

export default (passThrough, createNode) => {
  const term = (htmlParentNode, xmlnode) => {
    const dt = createNode('dt');
    mapAttributes(dt, xmlnode);
    // TODO DT gets id from def-item; cf. def-item.js
    dt.setAttribute('id', xmlnode.parentNode.id);
    htmlParentNode.appendChild(dt);
    passThrough(dt, xmlnode);
  };
  return term;
};
