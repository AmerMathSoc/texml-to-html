import {unnestLinks} from '../helpers/unnest.js';
import { replaceTeXCharactersInNodes } from '../helpers/helpers-tex.js';

export default (recurseTheDom, passThrough, createNode) => {
  const extLink = (htmlParentNode, xmlnode) => {
    if (xmlnode.closest('tex-math')) {
      htmlParentNode.insertAdjacentText('beforeend', `\\href{${xmlnode.getAttribute('xlink:href')}}{`); // NOTE href works in both math and text mode; `\href`'s first argument does not need replaceTeXCharactersInNodes
      replaceTeXCharactersInNodes(xmlnode);
      passThrough(htmlParentNode, xmlnode); // NOTE maybe wrap in \text{} (no use case yet)
      htmlParentNode.insertAdjacentText('beforeend', `}`);
      return;
    }
    const anchor = createNode('a', '', {
      href: xmlnode.getAttribute('xlink:href')
    });
    htmlParentNode.appendChild(anchor);
    // handle nested links
    const linkChild = xmlnode.childNodes.find(node => node.tagName === 'xref' || node.tagName === 'ext-link');
    if (linkChild) unnestLinks(recurseTheDom, createNode, xmlnode, anchor, linkChild)
    else passThrough(anchor, xmlnode);
  };
  return extLink;
};