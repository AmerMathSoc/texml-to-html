export default function (htmlParentNode, xmlnode) {
  // basically mscKey.js
  const key = xmlnode.querySelector('compound-kwd-part[content-type="code"]').textContent;
  const anchor = this.createNode('a', `${key} (`, {
    href: `http://www.ams.org/msc/msc2010.html?t=${key}`
  });
  htmlParentNode.appendChild(anchor);
  const description = xmlnode.querySelector('compound-kwd-part[content-type="text"]');
  description.innerHTML = description.innerHTML.trim(); // NOTE since we add ( earlier, we need to trim whitespace that texml creates TODO update test case after switch to JS
  this.passThrough(anchor, description);
  anchor.insertAdjacentText('beforeend', ')');
  const text =
    xmlnode.nextElementSibling &&
      xmlnode.nextElementSibling.tagName === xmlnode.tagName &&
      xmlnode.nextElementSibling.getAttribute('content-type') === xmlnode.getAttribute('content-type')
      ? ', '
      : '\n';
  htmlParentNode.insertAdjacentText('beforeend', text);
};
