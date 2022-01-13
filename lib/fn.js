const mapAttributes = require('./mapAttributes');

module.exports = (passThrough, createNode) => {
  const fn = (htmlParentNode, xmlnode) => {
    const div = createNode('div', '', { role: 'doc-footnote' });
    // NOTE AmerMathSoc/ams-xml-to-html#336 analyzed where fn occurs in publications; might need revisions
    // Essentially, we can assume fn occurs inside elements (that turn into) p, h1, and span (from formula markup)
    // Since a span ancestor can be inside p (e.g., from inline-formula) we check for the others first.
    const maybeBadAncestor = htmlParentNode.closest('p, h1') || htmlParentNode.closest('span');
    maybeBadAncestor ? maybeBadAncestor.insertAdjacentElement('afterend', div) : htmlParentNode.appendChild(div);
    mapAttributes(div, xmlnode);
    passThrough(div, xmlnode);
  };
  return fn;
};
