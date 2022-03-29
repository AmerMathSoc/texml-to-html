export default function (htmlParentNode, xmlnode) {
  const h1 = this.createNode('h1');
  htmlParentNode.appendChild(h1);
  this.passThrough(h1, xmlnode);
};
