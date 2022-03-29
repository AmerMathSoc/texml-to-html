export default function (htmlParentNode, xmlnode) {
  const img = this.createNode('img', '', {
    src: xmlnode.getAttribute('src'),
    alt: xmlnode.getAttribute('alt') || ''
  });
  htmlParentNode.appendChild(img);
};
