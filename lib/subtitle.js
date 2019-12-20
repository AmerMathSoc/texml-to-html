module.exports = (passThrough, createNode) => {
  const subtitle = (htmlParentNode, xmlnode) => {
    // NOTE was multiple templates: book-title-group/subtitle and mode=generic)
    const isbookTitleGroup = Boolean(xmlnode.closest('book-title-group'));
    // NOTE otherwise (so far) subtitles are handled by title/label handling which creates a header as htmlParent
    const isInHeader = htmlParentNode.tagName === 'HEADER';
    if (!(isbookTitleGroup || isInHeader)) {
      return;
    }
    const p = createNode('p', '', { 'data-ams-doc': 'subtitle' });
    htmlParentNode.appendChild(p);
    passThrough(p, xmlnode);
  };
  return subtitle;
};
