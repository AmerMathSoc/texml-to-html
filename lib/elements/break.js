/**
 * break element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
 export default function (htmlParentNode) {
  const br = this.createNode('br');
  htmlParentNode.appendChild(br);
};
