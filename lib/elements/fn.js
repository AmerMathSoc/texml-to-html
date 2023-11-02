import mapAttributes from '../helpers/mapAttributes.js';

/**
 * Recursively check siblings of maybeBadAncestor node if they are footnotes (so as to insert after all earlier footnotes from the same maybeBadAncestor, i.e., keep order of footnotes correct).
 * 
 * @param {HTMLElement} maybeBadAncestor 
 * @returns {HTMLElement}
 */
const getElementToInsertAfter = maybeBadAncestor => (maybeBadAncestor.nextElementSibling && maybeBadAncestor.nextElementSibling.getAttribute('role') === 'doc-footnote') ? getElementToInsertAfter(maybeBadAncestor.nextElementSibling) : maybeBadAncestor;

/**
 * 
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  if (xmlnode.closest('tex-math')) xmlnode.remove();
  const div = this.createNode('div', '', { role: 'doc-footnote', 'aria-label': `Footnote ${xmlnode.querySelector('label').textContent}` });
  // NOTE AmerMathSoc/texml-to-html#336 analyzed where fn occurs in publications; might need revisions
  // Essentially, we can assume fn occurs inside elements (that turn into) p, h1, and span (from formula markup)
  // Since a span ancestor can be inside p (e.g., from inline-formula) we check for the others first.
  const maybeBadAncestor = htmlParentNode.closest('p, h1') || htmlParentNode.closest('span');
  maybeBadAncestor ? getElementToInsertAfter(maybeBadAncestor).insertAdjacentElement('afterend', div) : htmlParentNode.appendChild(div);
  mapAttributes(div, xmlnode);
  this.passThrough(div, xmlnode);
};
