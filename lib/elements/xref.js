import { unnestLinks } from '../helpers/unnest.js';
import { replaceTeXCharactersInNodes } from '../helpers/helpers-tex.js';

export default (recurseTheDom, passThrough, createNode) => {
  const xref = (htmlParentNode, xmlnode) => {
    // case toc-entry//xref
    const tocEntryAncestor = xmlnode.closest('toc-entry');
    if (tocEntryAncestor) {
      passThrough(htmlParentNode, xmlnode); // TODO matches XSL; consider wrapping span, cf. notrid case later
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
        `\\xhref[${refType}]{#${rid}}{` // TODO HACK: the leading whitespace avoids a MathJax bug (Theorem with footnotes in test01.xml)
      );
      if (isFootnoteRef) htmlParentNode.insertAdjacentText('beforeend', `{}^{`);
      replaceTeXCharactersInNodes(xmlnode);
      passThrough(htmlParentNode, xmlnode);
      if (isFootnoteRef) htmlParentNode.insertAdjacentText('beforeend', `}`);
      htmlParentNode.insertAdjacentText('beforeend', `}`);
      return;
    }
    // case contrib/xref[ref-type="aff"]
    if (xmlnode.getAttribute('ref-type') === 'aff') {
      const dd = createNode('dd');
      htmlParentNode.appendChild(dd);
      const rid = xmlnode.getAttribute('rid');
      const aff = xmlnode.parentNode.parentNode.querySelector(`#${rid}`);
      if (aff.getAttribute('specific-use') === 'current') {
        dd.appendChild(
          createNode('span', 'Address at time of publication: ')
        );
      }
      passThrough(dd, aff);
      return;
    }
    const rid = xmlnode.getAttribute('rid');
    if (!rid) {
      const span = createNode('span', '', {
        'data-ams-ref': 'notrid'
      });
      htmlParentNode.appendChild(span);
      passThrough(span, xmlnode);
      return;
    }
    const anchor = createNode('a', '', {
      href: `#${rid}`,
      'data-ams-ref': refType
    });
    const typeToRole = {
      fn: 'doc-noteref',
      bibr: 'doc-biblioref'
    };
    if (typeToRole[refType]) anchor.setAttribute('role', typeToRole[refType]);
    if (refType === 'bibr') {
      const cite = createNode('cite');
      cite.appendChild(anchor);
      htmlParentNode.appendChild(cite);
    } else {
      htmlParentNode.appendChild(anchor);
    }
    // handle nested xref 
    const linkChild = xmlnode.childNodes.find(node => node.tagName === 'xref' || node.tagName === 'ext-link');
    if (linkChild) unnestLinks(recurseTheDom, createNode, xmlnode, anchor, linkChild)
    else passThrough(anchor, xmlnode);
    // footonote ref gets wrapped in <sup>
    if (isFootnoteRef) {
      anchor.innerHTML = `<sup>${anchor.innerHTML}</sup>`;
    }
  };
  return xref;
};
