/**
 * article-meta element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const section = this.createNode('section', '', {
    'data-ams-doc': 'copyright-page'
  });
  htmlParentNode.appendChild(section);
  const h2 = this.createNode('h2', 'Article Information');
  section.appendChild(h2);
  const dl = this.createNode('dl');
  section.appendChild(dl);

  this.recurseTheDom(dl, xmlnode.querySelector('subj-group'));
  xmlnode.querySelectorAll('kwd-group').forEach(this.recurseTheDom.bind(null, dl));
  xmlnode
    .querySelectorAll('contrib-group')
    .forEach(this.recurseTheDom.bind(null, dl));
  this.recurseTheDom(dl, xmlnode.querySelector('funding-group'));
  xmlnode.querySelectorAll('custom-meta').forEach(this.recurseTheDom.bind(null, dl));
  this.recurseTheDom(dl, xmlnode.parentNode.querySelector('journal-meta'));
  this.recurseTheDom(dl, xmlnode.querySelector('pub-date'));
  this.recurseTheDom(dl, xmlnode.querySelector('copyright-statement'));

  dl.appendChild(this.createNode('dt', 'Article References'));
  const artRefDD = this.createNode('dd');
  dl.appendChild(artRefDD);
  const artRefUL = this.createNode('ul');
  artRefDD.appendChild(artRefUL);
  xmlnode
    .querySelectorAll('self-uri')
    .forEach(this.recurseTheDom.bind(null, artRefUL));
  xmlnode
    .querySelectorAll('article-id')
    .forEach(this.recurseTheDom.bind(null, artRefUL));
  this.recurseTheDom(artRefUL, xmlnode.querySelector('article-citation'));
};
