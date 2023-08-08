import getParentLevel from '../helpers/getParentLevel.js';

/**
 * label and title elements
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const caption = this.caption;

  // simple cases
  // CASE fn
  if (xmlnode.parentNode.tagName === 'fn') {
    const span = this.createNode('span', '<sup></sup>', {
      'data-ams-doc': 'label'
    });
    htmlParentNode.appendChild(span);
    const superscript = span.firstElementChild;
    this.passThrough(superscript, xmlnode);
    return;
  }
  // CASE ref
  if (xmlnode.parentNode.tagName === 'ref') {
    // NOTE the DT created in ref.js serves as wrapper
    this.passThrough(htmlParentNode, xmlnode);
    return;
  }
  // CASE fig, fig-group, table-wrap, table-wrap-group via caption
  if (
    xmlnode.parentNode.tagName === 'table-wrap' ||
    xmlnode.parentNode.tagName === 'table-wrap-group' ||
    xmlnode.parentNode.tagName === 'fig' ||
    xmlnode.parentNode.tagName === 'fig-group'
  ) {
    caption(htmlParentNode, xmlnode);
    return;
  }
  // CASE label followed by a title -- we skip (and pull in the label later on when processing title)
  if (xmlnode.nextElementSibling?.tagName === 'title') return;
  // CASE empty label
  if (xmlnode.tagName === 'label' && xmlnode.innerHTML.trim() === '') return;

  // complex cases

  // Decide output markup (h* or figcaption; wrapping header for subtitles)
  const isStatement = xmlnode.parentNode.tagName === 'statement';
  const isDispFormulaGroup = xmlnode.parentNode.tagName === 'disp-formula-group';
  const level = getParentLevel(htmlParentNode) + 1;
  const heading = (isStatement || isDispFormulaGroup) ? this.createNode('figcaption', '') : this.createNode(`h${level}`, '');
  htmlParentNode.appendChild(heading);

  // subtitle handling (assumes heading is not figcaption)
  const subtitleSibling = xmlnode.parentNode.querySelector(':scope>subtitle');
  if (subtitleSibling && subtitleSibling.innerHTML.trim() !== '') {
    // wrap heading in header
    const header = this.createNode('header');
    htmlParentNode.appendChild(header);
    header.appendChild(heading);
    // recurse subtitle
    this.recurseTheDom(header, subtitleSibling);
  }

  // Pull in label (if title+label and we're processing title)
  const previousSibling = xmlnode.previousElementSibling;
  if (previousSibling?.tagName === 'label' && previousSibling.innerHTML.trim() !== '') {
    const labelSpan = this.createNode('span', '', { 'data-ams-doc': 'label' });
    heading.appendChild(labelSpan);
    this.passThrough(labelSpan, previousSibling);
    const labelSeparatorString = isStatement ? ' ' : '. ';
    labelSpan.insertAdjacentText('beforeend', labelSeparatorString);
  }

  // CASE Book
  const altTitle = xmlnode.parentNode.querySelector(':scope>alt-title');
  const hasAltTitle = altTitle && altTitle.innerHTML !== xmlnode.innerHTML;
  if (this.isBook && hasAltTitle) {
    heading.setAttribute('data-ams-doc-alttitle', heading.textContent + altTitle.innerHTML); // NOTE assumes previousSibling handled first
  }

  // recurse main node
  this.passThrough(heading, xmlnode);

  // faking TeX's punctutation-at-end logic
  if (isStatement) heading.insertAdjacentText('beforeend', heading.textContent.endsWith('.') ? ' ' : '. ');
};
