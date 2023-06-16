import { unnestLinks } from '../helpers/unnest.js';
import { node2macro } from '../helpers/helpers-tex.js';

/**
 * ext-link element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  if (xmlnode.closest('tex-math')) {
    node2macro.apply(this, [htmlParentNode, xmlnode, `href{${xmlnode.getAttribute('xlink:href')}}`, true]); // NOTE href works in both math and text mode; `\href`'s first argument does not need escaping
    return;
  }
  const anchor = this.createNode('a', '', {
    href: xmlnode.getAttribute('xlink:href')
  });
  htmlParentNode.appendChild(anchor);
  // handle nested links
  const linkChild = xmlnode.childNodes.find(node => node.tagName === 'xref' || node.tagName === 'ext-link');
  if (linkChild) unnestLinks(this.recurseTheDom, this.createNode, xmlnode, anchor, linkChild)
  else this.passThrough(anchor, xmlnode);
};
