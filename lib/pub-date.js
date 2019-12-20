module.exports = createNode => {
  const pubDate = (htmlParentNode, xmlnode) => {
    htmlParentNode.appendChild(createNode('dt', 'Publication History'));
    const dd = createNode('dd');
    htmlParentNode.appendChild(dd);
    // TODO refactor into methods? (cf. journal-meta)
    dd.insertAdjacentText('beforeend', 'This article was received on ');
    const rectime = xmlnode.parentNode
      .querySelector('history>date[date-type="received"]')
      .getAttribute('iso-8601-date');
    dd.appendChild(createNode('time', rectime, { datetime: rectime }));
    // revision dates
    const revs = xmlnode.parentNode.querySelectorAll(
      'history>date[date-type="rev-recd"]'
    );
    if (revs.length > 0)
      dd.insertAdjacentText('beforeend', `,\u00A0revised on `);
    else dd.insertAdjacentText('beforeend', ' ');
    revs.forEach(rev => {
      const revtime = rev.getAttribute('iso-8601-date');
      // TODO should be a time element like the others
      dd.appendChild(createNode('time', revtime, { datetime: revtime }));
      dd.insertAdjacentText('beforeend', ', ');
    });
    dd.insertAdjacentText('beforeend', ' and published on '); // TODO extra space b/c xslt does this; can be dropped later
    const pubtime = xmlnode.getAttribute('iso-8601-date');
    dd.appendChild(createNode('time', pubtime, { datetime: pubtime }));
    dd.insertAdjacentText('beforeend', '.');
  };
  return pubDate;
};
