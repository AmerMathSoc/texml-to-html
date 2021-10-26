const sectioningDictionary = {
  part: 0,
  chapter: 0,
  section: 1,
  refhead: 1, // NOTE NOTI only
  subsection: 2,
  subsubsection: 3,
  paragraph: 4,
  subparagraph: 5,
};

module.exports = (passThrough, createNode) => {
  const sec = (htmlParentNode, xmlnode) => {
    const isBook = xmlnode.closest('book'); // TODO isBook xmlnode.getRootNode().firstElementChild.tagName
    const tagName = xmlnode.tagName;
    const specificUse = xmlnode.getAttribute('specific-use');
    const articleWithPartIncrement =
      !isBook && xmlnode.getRootNode().querySelector('sec[specific-use="part"]')
        ? 1
        : 0;
    const hasDictionaryEntry = sectioningDictionary[specificUse] !== undefined;
    const ancestorWithLevel = htmlParentNode.closest('[data-ams-doc-level]');
    // if there is no sectioningDictionary entry, we use the ancestor to decide, if 0 or 5 is appropriate.
    // NOTE front-matter (aliased to sec()) doesn't have an ancestor.
    const level = hasDictionaryEntry
      ? sectioningDictionary[specificUse]
      : ancestorWithLevel
      ? 5
      : 0;
    const section = createNode('section', '', {
      'data-ams-doc-level': level + articleWithPartIncrement,
      'data-ams-doc': specificUse,
      id: xmlnode.getAttribute('id'),
    });
    htmlParentNode.appendChild(section);

    if (specificUse === 'part') {
      section.setAttribute('role', 'doc-part');
    }
    if (specificUse === 'chapter') {
      section.setAttribute('role', 'doc-chapter');
    }
    section.removeAttribute('specific-use');
    if (tagName === 'dedication')
      section.setAttribute('role', 'doc-dedication');

    // Acknowledgements
    const titleChild = xmlnode.querySelector('title');
    if (
      tagName === 'ack' ||
      (titleChild && titleChild.textContent.startsWith('Acknowledg'))
    ) {
      section.setAttribute('role', 'doc-acknowledgments');
    }
    if (tagName === 'ack' && !isBook)
      section.setAttribute('data-ams-doc-level', '1');
    if (titleChild && titleChild.textContent.startsWith('Introduction'))
      section.setAttribute('role', 'doc-introduction');

    // book appendices
    if (tagName === 'book-app-group') {
      // NOTE might become redundant if book-app-group gets specific-use=part
      section.setAttribute('role', 'doc-part');
      section.setAttribute('data-ams-doc', 'part');
      section.setAttribute('data-ams-doc-level', '0');
    }
    if (tagName === 'book-app') section.setAttribute('role', 'doc-appendix');

    passThrough(section, xmlnode);
  };
  return sec;
};
