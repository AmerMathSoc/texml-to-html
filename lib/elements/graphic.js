export default function (htmlParentNode, xmlnode) {
  const img = this.createNode('img', '', {
    'data-ams-doc': xmlnode.tagName,
    src: xmlnode.getAttribute('xlink:href'),
    'data-ams-style': xmlnode.getAttribute('specific-use'),
    'data-ams-width': xmlnode.getAttribute('width'),
    'data-ams-height': xmlnode.getAttribute('height'),
    alt: ''
  });
  htmlParentNode.appendChild(img);
  if (xmlnode.parentNode.tagName !== 'fig') return;
  // NOTE We assume alt-text appears only in figures; cf. AmerMathSoc/texml#55
  const altText = xmlnode.parentNode.querySelector('alt-text');
  if (altText) img.setAttribute('alt', altText.textContent);
};
