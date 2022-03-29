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
    // NOTE firstElementChild should be a figcaption element (cf. caption() )
    // TODO brittle. Can we do better?
    actualParent = htmlParentNode.firstElementChild;
  }
  const span = this.createNode('span');
  actualParent.insertAdjacentText('beforeend', ' '); // NOTE needed inside fig-caption
  actualParent.appendChild(span);
  this.passThrough(span, xmlnode);
};
