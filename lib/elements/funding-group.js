export default function (htmlParentNode, xmlnode) {
  htmlParentNode.appendChild(this.createNode('dt', 'Additional Notes'));
  const dd = this.createNode('dd');
  htmlParentNode.appendChild(dd);
  this.passThrough(dd, xmlnode);
};
