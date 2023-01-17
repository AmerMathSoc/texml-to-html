/**
 * email element 
 * NOTE: only for email within content; within metadata see the json generation.
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const text = xmlnode.textContent;
  htmlParentNode.appendChild(
    this.createNode('a', text, { href: `mailto://${text}` })
  );
};
