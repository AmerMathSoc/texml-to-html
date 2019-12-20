module.exports = (passThrough, createNode) => {
  const xref = (htmlParentNode, xmlnode) => {
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
      const refType = xmlnode.getAttribute('ref-type');
      const rid = xmlnode.getAttribute('rid');
      const isInText = xmlnode.closest('text');
      const isFootnoteRef = refType === 'fn';
      if (isInText) htmlParentNode.insertAdjacentText('beforeend', `$`);
      htmlParentNode.insertAdjacentText(
        'beforeend',
        ` \\xhref[${refType}]{#${rid}}{` // TODO HACK: the leading whitespace avoids a MathJax bug (Theorem with footnotes in test01.xml)
      );
      if (isFootnoteRef) htmlParentNode.insertAdjacentText('beforeend', `{}^{`);
      htmlParentNode.insertAdjacentText('beforeend', xmlnode.textContent);
      if (isFootnoteRef) htmlParentNode.insertAdjacentText('beforeend', `}`);
      htmlParentNode.insertAdjacentText('beforeend', `}`);
      if (isInText) htmlParentNode.insertAdjacentText('beforeend', `$`);
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
    const refType = xmlnode.getAttribute('ref-type');
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
    passThrough(anchor, xmlnode);
  };
  return xref;
};
