/*!
 *  Copyright (c) 2023 American Mathematical Society
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

import { replaceTeXCharactersInNodes } from '../helpers/helpers-tex.js';

/**
 * xref element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const rid = xmlnode.getAttribute('rid');

  // case: no RID 
  if (!rid) {
    const span = this.createNode('span', '', {
      'data-ams-ref': 'notrid'
    });
    htmlParentNode.appendChild(span);
    this.passThrough(span, xmlnode);
    return;
  }

  // case nested links
  const isNestedLink = htmlParentNode.closest('a');
  if (isNestedLink) {
    const anchor =
      this.createNode('span', '', {
        'data-ams-href': rid,
      })
    htmlParentNode.appendChild(anchor);
    this.passThrough(anchor, xmlnode);
    if (!xmlnode.closest('toc-entry')) console.log('Warning: texml-to-html: Nested xref', xmlnode.outerHTML);
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
  // the "regular" case: a cross-reference
  const anchor = this.createNode('a', '', {
    href: `#${rid}`,
    'data-ams-ref': refType
  });
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
  // Recursion
  this.passThrough(anchor, xmlnode);
  // footonote ref gets wrapped in <sup>
  if (isFootnoteRef) {
    anchor.innerHTML = `<sup>${anchor.innerHTML}</sup>`;
  }
};
