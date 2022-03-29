export default function (htmlParentNode, xmlnode) {
  const div = this.createNode('div');
  htmlParentNode.appendChild(div);
  this.passThrough(div, xmlnode);
};
