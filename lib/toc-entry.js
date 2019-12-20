module.exports = (recurseTheDom, passThrough, createNode) => {
  const tocEntry = (htmlParentNode, xmlnode) => {
    const li = createNode('li');
    htmlParentNode.appendChild(li);
    const anchor = createNode('a', '', {
      href: `#${xmlnode.querySelector('nav-pointer').getAttribute('rid')}`
    });
    li.appendChild(anchor);
    // TODO unify label/title processing with label() - requires some form of new wrapper around content in lieu of heading (or have it add the anchor but then the nav-pointer will be odd to pull in)
    const firstElementChild = xmlnode.firstElementChild;
    const label =
      firstElementChild.tagName === 'label' ? firstElementChild : null;
    const title =
      firstElementChild.tagName === 'label'
        ? firstElementChild.nextElementSibling
        : firstElementChild;
    if (label && label.innerHTML.trim !== '') {
      passThrough(anchor, label);
      anchor.insertAdjacentText('beforeend', '. ');
    }
    if (title) passThrough(anchor, title);
    if (!xmlnode.querySelector('toc-entry')) return;
    // nested toc-entries means we have a sub-toc
    const ol = createNode('ol');
    li.appendChild(ol);
    [...xmlnode.childNodes]
      .filter(node => node.tagName === 'toc-entry')
      .forEach(recurseTheDom.bind(null, ol));
  };
  return tocEntry;
};
