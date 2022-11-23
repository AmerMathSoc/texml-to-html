/**
 * ref element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const dt = this.createNode('dt');
  dt.id = xmlnode.id;
  htmlParentNode.appendChild(dt);
  this.recurseTheDom(dt, xmlnode.querySelector('label'));
  this.recurseTheDom(htmlParentNode, xmlnode.querySelector('mixed-citation'));
};
