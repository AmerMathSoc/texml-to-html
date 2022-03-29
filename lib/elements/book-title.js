export default function (htmlParentNode, xmlnode) {
  const heading = this.createNode('h1');
  htmlParentNode.appendChild(heading);
  this.passThrough(heading, xmlnode);
};
