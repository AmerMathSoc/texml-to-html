const fs = require('fs');
const path = require('path');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const nodeRename = (document, node, newTagName) => {
    if (!node) throw new Error('No node found');
    const newNode = document.createElement(newTagName);
    while (node.firstChild) newNode.appendChild(node.firstChild);
    for (let attribute of node.attributes) {
      newNode.setAttribute(attribute.name, attribute.value);
    }
    newNode.setAttribute('data-xmltag', node.tagName.toLowerCase());
    node.parentNode.replaceChild(newNode, node);
    return newNode;
  };

const nodeUnwrap = (document, node) => {
    const parent = node.parentNode;
    if (!parent) throw new Error('No parent node found');
    while (node.firstChild) parent.insertBefore(node.firstChild, node);
    node.delete;
}

const createTitle = (document, root) => {
    const bookTitle = root.querySelector('book-meta book-title-group book-title');
    const articleAltTitle = root.querySelector('front article-meta title-group alt-title');
    const articleTitle = root.querySelector('front article-meta title-group article-title');
    const originalTitle = bookTitle || articleAltTitle || articleTitle;
    const title = document.createElement('title');
    title.textContent = originalTitle.textContent;
    return title;
}

const createChild = (document, parent, tagname) => {
    const child = document.createElement(tagname);
    parent.appendChild(child);
    return child;
}

const handleAbstract = (document, root, parent) => {

}

const createTitlepage = (document, root) => {
    const titlepage = createChild(document, document.body, 'section');
    titlepage.setAttribute('data-type','titlepage');
    createJournalHead(document, root, titlepage);
    const heading = createChild(document, titlepage, 'h1');
    heading.innerHTML = root.querySelector('front article-meta title-group article-title').innerHTML;
    handleAbstract(document, root, titlepage);
    return titlepage;
}

const createJournalHead = (document, root, parent) => {
    const header = createChild(document, parent, 'header');
    const aside = createChild(document, header, 'aside');
    aside.setAttribute('data-jats', 'journal');
    const title = createChild(document, aside, 'p');
    title.setAttribute('data-jats', 'title');
    title.textContent = root.querySelector('front journal-meta journal-title-group journal-title').textContent;
    return header;
}

const main = (xmlstring) => {
  const xml = new JSDOM(xmlstring, { contentType: 'text/xml' });
  const xmldoc = xml.window.document;

  const html = new JSDOM('');
  const htmldoc = html.window.document;

  htmldoc.body.appendChild(
    htmldoc.importNode(xmldoc.querySelector('tex-math'), true)
  );

  return html;
};

module.exports = main;

if (require.main === module) {
  const input = fs.readFileSync(path.resolve(process.argv[2])).toString();
  const output = path.resolve(process.argv[3]);
  const html = main(input);
  fs.writeFileSync(output, html.serialize());
}
