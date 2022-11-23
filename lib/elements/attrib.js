/**
 * attrib element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  let actualParent = htmlParentNode;
  if (xmlnode.parentNode.tagName === 'disp-quote') {
    const footer = this.createNode('footer');
    htmlParentNode.appendChild(footer);
    actualParent = footer;
  }
  if (
    xmlnode.parentNode.tagName === 'fig' ||
    xmlnode.parentNode.tagName === 'fig-group'
  ) {
    // NOTE there should be a figcaption element (cf. caption())
    // NOTE so far this only occurs in mbk103, clrm067 to attribute graphics in figures
    actualParent = [...htmlParentNode.children].find(
      (child) => child.tagName === 'FIGCAPTION'
    );
  }
  const span = this.createNode('span');
  actualParent.insertAdjacentText('beforeend', ' '); // NOTE needed inside fig-caption
  actualParent.appendChild(span);
  this.passThrough(span, xmlnode);
};
