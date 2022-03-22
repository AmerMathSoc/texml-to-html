export default (passThrough, createNode) => {
  const metaName = (htmlParentNode, xmlnode) => {
    // NOTE currently, we only have custom-meta[@specific-use='communicated-by']>meta-name; future publications might need more here
    const dt = createNode('dt');
    const specificUse = xmlnode.parentNode.getAttribute('specific-use');
    if (specificUse) dt.setAttribute('data-ams-specific-use', specificUse);
    htmlParentNode.appendChild(dt);
    passThrough(dt, xmlnode);
  };
  return metaName;
};
