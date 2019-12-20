module.exports = (createNode) => {
  const uri = (htmlParentNode, xmlnode) => {
    const dd = createNode('dd');
    htmlParentNode.appendChild(dd);
    dd.appendChild(
      createNode('a', 'Homepage', { href: xmlnode.textContent })
    );
  };
  return uri;
};
