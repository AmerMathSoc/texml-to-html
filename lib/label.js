const getParentLevel = require('./getParentLevel');

module.exports = (recurseTheDom, passThrough, createNode) => {

  const caption = require('./caption')(passThrough, createNode);

  const label = (htmlParentNode, xmlnode) => {
    // handle fn
    if (xmlnode.parentNode.tagName === 'fn') return;
    // handle ref
    if (xmlnode.parentNode.tagName === 'ref') {
      const span = createNode('span'); // TODO can the wrapping span be dropped?
      htmlParentNode.appendChild(span);
      passThrough(span, xmlnode);
      return;
    }
    // handle fig, fig-group via caption
    if (
      xmlnode.parentNode.tagName === 'fig' ||
      xmlnode.parentNode.tagName === 'fig-group'
    ) {
      caption(htmlParentNode, xmlnode);
      return;
    }
    const nextSibling = xmlnode.nextElementSibling;
    // NOTE if a label is followed by a title, we skip (and pull in the label later on when processing title)
    if (nextSibling && nextSibling.tagName === 'title') return;
    // NOTE ignore empty label
    if (xmlnode.tagName === 'label' && xmlnode.innerHTML.trim() === '') return;
    const previousSibling = xmlnode.previousElementSibling;
    const hasLabelSibling =
      previousSibling &&
      previousSibling.tagName === 'label' &&
      previousSibling.innerHTML.trim() !== '';
    const altTitle = xmlnode.parentNode.querySelector(':scope > alt-title');
    const hasAltTitle = altTitle && altTitle.innerHTML !== xmlnode.innerHTML;
    const isBook = xmlnode.ownerDocument.firstElementChild.tagName === 'book'; // TODO extract into property or function?

    const subtitleSibling = xmlnode.parentNode.querySelector(':scope > subtitle');
    const hasSubtitleSibling = subtitleSibling && subtitleSibling.innerHTML.trim() !== '';
    const isStatement = xmlnode.parentNode.tagName === 'statement';
    const level = getParentLevel(htmlParentNode) + 1;
    const header = createNode('header');
    const heading = createNode(`h${level}`, '');
    if (hasSubtitleSibling) {
      htmlParentNode.appendChild(header);
      header.appendChild(heading);
    } else {
      htmlParentNode.appendChild(heading);
    }
    if (hasLabelSibling) {
      passThrough(heading, previousSibling);
      const labelSeparatorString = isStatement ? ' ' : '. ';
      heading.insertAdjacentText('beforeend', labelSeparatorString);
    }
    if (isBook && hasAltTitle) {
      const altTitleContent = altTitle.innerHTML;
      heading.setAttribute('data-ams-doc-alttitle', heading.textContent + altTitleContent); // NOTE assumes hasLabelSibling handled first
    }
    passThrough(heading, xmlnode);
    if (isStatement) heading.insertAdjacentText('beforeend', '. ');
    if (hasSubtitleSibling) recurseTheDom(header, subtitleSibling);
  };
  return label;
};
