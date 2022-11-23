import path from 'path';

/**
 * graphic and inline-graphic element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const filename = xmlnode.getAttribute('xlink:href');
  // texml sometimes generates unitless dimensions; we add px then
  let width = xmlnode.getAttribute('width');
  if (width.search(/[^0-9]/) === -1) width = width + 'px';
  let height = xmlnode.getAttribute('height');
  if (height.search(/[^0-9]/) === -1) height = height + 'px';
  const alttext = this.imageAltDictionary[path.basename(filename)] || 'Graphic without alt text';
  if (xmlnode.closest('tex-math')) {
    htmlParentNode.insertAdjacentText('beforeend', `\\vcenter{\\img[][${width}][${height}][{${alttext}}]{${filename}}}`);
    return;
  }
  const img = this.createNode('img', '', {
    'data-ams-doc': xmlnode.tagName,
    src: filename,
    'data-ams-style': xmlnode.getAttribute('specific-use'),
    'data-ams-width': width,
    'data-ams-height': height,
    alt: alttext
  });
  htmlParentNode.appendChild(img);
  if (xmlnode.parentNode.tagName !== 'fig') return;
  // NOTE We assume alt-text appears only in figures; cf. AmerMathSoc/texml#55
  const altText = xmlnode.parentNode.querySelector('alt-text');
  if (altText) img.setAttribute('alt', altText.textContent);
};
