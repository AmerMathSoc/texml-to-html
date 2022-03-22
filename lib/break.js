export default (createNode) => {
  const br = (htmlParentNode) => {
    const br = createNode('br');
    htmlParentNode.appendChild(br);
  };
  return br;
};
