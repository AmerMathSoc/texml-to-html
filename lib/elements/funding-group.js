export default (passThrough, createNode) => {
  const fundingGroup = (htmlParentNode, xmlnode) => {
    htmlParentNode.appendChild(createNode('dt', 'Additional Notes'));
    const dd = createNode('dd');
    htmlParentNode.appendChild(dd);
    passThrough(dd, xmlnode);
  };
  return fundingGroup;
};
