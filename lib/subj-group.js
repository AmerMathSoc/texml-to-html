module.exports = (recurseTheDom, createNode) => {
  const subjGroup = (htmlParentNode, xmlnode) => {
    htmlParentNode.appendChild(
      createNode('dt', `Subjects`)
    );
    xmlnode
      .querySelectorAll('subject')
      .forEach(recurseTheDom.bind(null, htmlParentNode));
  };
  return subjGroup;
};
