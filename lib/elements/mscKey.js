export default function (htmlParentNode, xmlnode) {
  const key = xmlnode.querySelector('key').textContent;
  const anchor = this.createNode('a', `${key} (`, {
    href: `http://www.ams.org/msc/msc2010.html?t=${key}`
  });
  htmlParentNode.appendChild(anchor);
  const description = xmlnode.querySelector('description');
  description.innerHTML = description.innerHTML.trim(); // NOTE since we add ( earlier, we need to trim whitespace that texml creates TODO update test case after switch to JS
  this.passThrough(anchor, description);
  anchor.insertAdjacentText('beforeend', ')');
  const text =
    xmlnode.nextElementSibling &&
      xmlnode.nextElementSibling.tagName === xmlnode.tagName
      ? ', '
      : '\n';
  htmlParentNode.insertAdjacentText('beforeend', text);
};
