export default (recurseTheDom, passThrough, createNode) => {
  const tocEntry = (htmlParentNode, xmlnode) => {
    const li = createNode('li');
    htmlParentNode.appendChild(li);
    const anchor = createNode('a', '', {
      href: `#${xmlnode.querySelector('nav-pointer').getAttribute('rid')}`,
    });
    li.appendChild(anchor);
    // TODO unify label/title processing with label() - requires some form of new wrapper around content in lieu of heading (or have it add the anchor but then the nav-pointer will be odd to pull in)
    // NOTE [...].find() HACK for bug with ':scope > ...', jsdom/jsdom#2998
    const label = [...xmlnode.children].find(
      (child) => child.tagName === 'label'
    );
    const title = [...xmlnode.children].find(
      (child) => child.tagName === 'title'
    );
    const altTitle = [...xmlnode.children].find(
      (child) => child.tagName === 'alt-title'
    );
    if (label && label.innerHTML.trim() !== '') {
      passThrough(anchor, label);
      anchor.insertAdjacentText('beforeend', '. ');
    }
    if (altTitle) {
      const altTitleContent = altTitle.textContent;
      anchor.setAttribute(
        'data-ams-doc-alttitle',
        anchor.textContent + altTitleContent
      );
    }
    if (title) passThrough(anchor, title);
    // NOTE we expect very simple markup: one contrib group, string-names only
    const contribGroup = [...xmlnode.children].find(
      (child) => child.tagName === 'contrib-group'
    );
    if (contribGroup) {
      const names = [...contribGroup.querySelectorAll('string-name')];
      if (names.length > 0) li.insertAdjacentHTML('beforeend', '<br>');
      li.insertAdjacentHTML(
        'beforeend',
        names.map((node) => `<em>${node.textContent}</em>`).join(', ')
      );
    }
    if (!xmlnode.querySelector('toc-entry')) return;
    // nested toc-entries means we have a sub-toc
    const ol = createNode('ol');
    li.appendChild(ol);
    [...xmlnode.childNodes]
      .filter((node) => node.tagName === 'toc-entry')
      .forEach(recurseTheDom.bind(null, ol));
  };
  return tocEntry;
};