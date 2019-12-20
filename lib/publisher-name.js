module.exports = (passThrough, createNode) => {
  const publisherName = (htmlParentNode, xmlnode) => {
    const span = createNode('span', '');
    htmlParentNode.appendChild(span);
    passThrough(span, xmlnode);
    if (xmlnode.nextElementSibling) {
      htmlParentNode.insertAdjacentText('beforeend', ', ');
    }
  };
  return publisherName;
};
