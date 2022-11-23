/**
 * article-citation elements contain raw amsref data.
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const li = this.createNode('li');
  htmlParentNode.appendChild(li);
  const code = this.createNode('code', xmlnode.textContent, {
    'data-ams-doc': 'amsref'
  });
  li.appendChild(code);
};
