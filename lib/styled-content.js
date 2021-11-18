module.exports = (passThrough, createNode) => {
  const styledContent = (htmlParentNode, xmlnode) => {
    const span = createNode('span', '');
    // handle style-type NOTE current values: sans-serif, oblique
    if (xmlnode.hasAttribute('style-type')) span.setAttribute('data-ams-style',  xmlnode.getAttribute('style-type'));
    // handle color attributes
    const colors = [];
    if (xmlnode.hasAttribute('text-color')) colors.push( `color:${xmlnode.getAttribute('text-color')};`);
    if (xmlnode.hasAttribute('background-color')) colors.push( `background-color:${xmlnode.getAttribute('background-color')};`);
    if (xmlnode.hasAttribute('border-color')) colors.push( `border-color:${xmlnode.getAttribute('border-color')};`);
    if (colors.length) span.setAttribute('data-ams-style-color', colors.join(''));
    htmlParentNode.appendChild(span);
    passThrough(span, xmlnode);
  };
  return styledContent;
};
