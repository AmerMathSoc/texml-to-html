import { unnestLinks } from '../helpers/unnest.js';
import { replaceTeXCharactersInNodes } from '../helpers/helpers-tex.js';

/**
 * xref element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  // case toc-entry//xref
  const tocEntryAncestor = xmlnode.closest('toc-entry');
  if (tocEntryAncestor) {
    this.passThrough(htmlParentNode, xmlnode);
    return;
  }
  const refType = xmlnode.getAttribute('ref-type');
  const isFootnoteRef = refType === 'fn';
  // case tex-math/xref, tex-math/text/xref (with a check for footnotes in tex-math)
  const texmathAncestor = xmlnode.closest('tex-math');
  const foonoteAncestor = xmlnode.closest('fn');
  if (
    texmathAncestor &&
    !(
      foonoteAncestor &&
      [...texmathAncestor.querySelectorAll('*')].includes(foonoteAncestor)
    )
  ) {
    const rid = xmlnode.getAttribute('rid');
    htmlParentNode.insertAdjacentText(
      'beforeend',
      `\\xhref[${refType}]{#${rid}}{`
    );
    if (isFootnoteRef) htmlParentNode.insertAdjacentText('beforeend', `{}^{`);
    replaceTeXCharactersInNodes(xmlnode);
    this.passThrough(htmlParentNode, xmlnode);
    if (isFootnoteRef) htmlParentNode.insertAdjacentText('beforeend', `}`);
    htmlParentNode.insertAdjacentText('beforeend', `}`);
    return;
  }
  // case contrib/xref[ref-type="aff"]
  if (xmlnode.getAttribute('ref-type') === 'aff') {
    const dd = this.createNode('dd');
    htmlParentNode.appendChild(dd);
    const rid = xmlnode.getAttribute('rid');
    const aff = xmlnode.parentNode.parentNode.querySelector(`#${rid}`);
    if (aff.getAttribute('specific-use') === 'current') {
      dd.appendChild(
        this.createNode('span', 'Address at time of publication: ')
      );
    }
    this.passThrough(dd, aff);
    return;
  }
  const rid = xmlnode.getAttribute('rid');
  if (!rid) {
    const span = this.createNode('span', '', {
      'data-ams-ref': 'notrid'
    });
    htmlParentNode.appendChild(span);
    this.passThrough(span, xmlnode);
    return;
  }
  const anchor = this.createNode('a', '', {
    href: `#${rid}`,
    'data-ams-ref': refType
  });
  if (xmlnode.hasAttribute('ref-label')) anchor.setAttribute('data-ams-ref-label', xmlnode.getAttribute('ref-label'));
  const typeToRole = {
    fn: 'doc-noteref',
    bibr: 'doc-biblioref'
  };
  if (typeToRole[refType]) anchor.setAttribute('role', typeToRole[refType]);
  if (refType === 'bibr') {
    const cite = this.createNode('cite');
    cite.appendChild(anchor);
    htmlParentNode.appendChild(cite);
  } else {
    htmlParentNode.appendChild(anchor);
  }
  // handle nested xref 
  const linkChild = xmlnode.childNodes.find(node => node.tagName === 'xref' || node.tagName === 'ext-link');
  if (linkChild) unnestLinks(this.recurseTheDom, this.createNode, xmlnode, anchor, linkChild)
  else this.passThrough(anchor, xmlnode);
  // footonote ref gets wrapped in <sup>
  if (isFootnoteRef) {
    anchor.innerHTML = `<sup>${anchor.innerHTML}</sup>`;
  }
};
