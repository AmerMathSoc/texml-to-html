export default function (htmlParentNode, xmlnode) {
  // unwrap nested formula elements and return
  // NOTE should only occur within <text> elements (which are not JATS/BITS)
  if (xmlnode.parentNode.closest('text')) {
    htmlParentNode.insertAdjacentText('beforeend', '$');
    this.passThrough(htmlParentNode, xmlnode);
    htmlParentNode.insertAdjacentText('beforeend', '$');
    return;
  }
  // Otherwise
  const mathMode = xmlnode.tagName === 'inline-formula' ? 'inline' : 'block';
  const span = this.createNode('span', '', {
    'data-ams-doc': `math ${mathMode}`
  });
  htmlParentNode.appendChild(span);
  if (mathMode === 'block' && xmlnode.querySelector('tex-math[has-qed-box]'))
    span.setAttribute('data-ams-qed-box', 'true'); // TODO xslt only did this for disp-formula; but bproc 10 (then again: only bproc10) has inline-formula with qed-box
  this.passThrough(span, xmlnode);
  // TODO we (sometimes?) get extra whitespace from childnodes; needs test
  const text = span.innerHTML;
  span.innerHTML = text.replace(/[ \n]+/g, ' ');
  // NOTE ensures prettier will not format TeX strings
  // NOTE ams-xml-to-html.js removes them again after serialization.
  // TODO prettier/prettier#7103 is preventing prettier
  // span.insertAdjacentHTML('beforebegin', '<!-- prettier-ignore -->')
};
