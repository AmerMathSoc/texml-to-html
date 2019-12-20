module.exports = (passThrough, createNode) => {
  const metaValue = (htmlParentNode, xmlnode) => {
    // NOTE currently, we only have custom-meta[@specific-use='communicated-by']>meta-value; future publications might need more here
    const dd = createNode('dd');
    htmlParentNode.appendChild(dd);
    passThrough(dd, xmlnode);
  };
  return metaValue;
};
