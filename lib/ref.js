module.exports = (recurseTheDom, createNode) => {
  const ref = (htmlParentNode, xmlnode) => {
    const dt = createNode('dt');
    dt.id = xmlnode.id;
    htmlParentNode.appendChild(dt);
    recurseTheDom(dt, xmlnode.querySelector('label'));
    recurseTheDom(htmlParentNode, xmlnode.querySelector('mixed-citation'));
  };
  return ref;
};
