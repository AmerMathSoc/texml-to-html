/**
 * pub-date element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  htmlParentNode.appendChild(this.createNode('dt', 'Publication History'));
  const dd = this.createNode('dd');
  htmlParentNode.appendChild(dd);
  // NOTE refactor into methods? (cf. journal-meta). See #254
  dd.insertAdjacentText('beforeend', 'This article was');
  const received = xmlnode.parentNode.querySelector(
    'history>date[date-type="received"]'
  );
  if (received) {
    dd.insertAdjacentText('beforeend', ' received on ');
    const rectime = received.getAttribute('iso-8601-date');
    dd.appendChild(this.createNode('time', rectime, { datetime: rectime }));
  }
  // revision dates
  const revs = xmlnode.parentNode.querySelectorAll(
    'history>date[date-type="rev-recd"]'
  );
  if (revs.length > 0)
    dd.insertAdjacentText('beforeend', `,\u00A0revised on `);
  else dd.insertAdjacentText('beforeend', ' ');
  revs.forEach((rev) => {
    const revtime = rev.getAttribute('iso-8601-date');
    dd.appendChild(this.createNode('time', revtime, { datetime: revtime }));
    dd.insertAdjacentText('beforeend', ', ');
  });
  if (received || revs.length > 0) dd.insertAdjacentText('beforeend', ' and');
  dd.insertAdjacentText('beforeend', ' published on '); // TODO extra space b/c xslt does this; can be dropped later
  const pubtime = xmlnode.getAttribute('iso-8601-date');
  dd.appendChild(this.createNode('time', pubtime, { datetime: pubtime }));
  dd.insertAdjacentText('beforeend', '.');
};
