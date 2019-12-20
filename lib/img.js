module.exports = createNode => {
  const img = (htmlParentNode, xmlnode) => {
    const img = createNode('img', '', {
      src: xmlnode.getAttribute('src'),
      alt: xmlnode.getAttribute('alt') || ''
    });
    htmlParentNode.appendChild(img);
  };
  return img;
};
