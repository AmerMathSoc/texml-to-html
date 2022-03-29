import getParentLevel from '../helpers/getParentLevel.js';

export default function (htmlParentNode, xmlnode) {
  // NOTE was multiple templates: book-title-group/subtitle and mode=generic)
  const isbookTitleGroup = Boolean(xmlnode.closest('book-title-group'));
  // NOTE otherwise (so far) subtitles are handled by title/label handling which creates a header as htmlParent
  const isInHeader = htmlParentNode.tagName === 'HEADER';
  if (!(isbookTitleGroup || isInHeader)) {
    return;
  }
  const p = this.createNode('p', '', { 'data-ams-doc': 'subtitle' });
  if (isInHeader) {
    const level = getParentLevel(htmlParentNode.parentNode) + 1; // NOTE parent is head; its parent should be a viable section
    p.setAttribute('data-ams-doc-level', level);
  }
  htmlParentNode.appendChild(p);
  this.passThrough(p, xmlnode);
};
