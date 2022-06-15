export default function (htmlParentNode, xmlnode) {
  // texml sometimes generates unitless dimensions; we add px then
  let width = xmlnode.getAttribute('width');
  if (width.search(/[^0-9]/) === -1) width = width + 'px';
  let height = xmlnode.getAttribute('height');
  if (height.search(/[^0-9]/) === -1) height = height + 'px';
  const img = this.createNode('img', '', {
    'data-ams-doc': xmlnode.tagName,
    src: xmlnode.getAttribute('xlink:href'),
    'data-ams-style': xmlnode.getAttribute('specific-use'),
    'data-ams-width': width,
    'data-ams-height': height,
    alt: ''
  });
  htmlParentNode.appendChild(img);
  if (xmlnode.parentNode.tagName !== 'fig') return;
  // NOTE We assume alt-text appears only in figures; cf. AmerMathSoc/texml#55
  const altText = xmlnode.parentNode.querySelector('alt-text');
  if (altText) img.setAttribute('alt', altText.textContent);
};
