import getParentLevel from '../helpers/getParentLevel.js';

export default function (htmlParentNode, xmlnode) {
    const caption = this.caption;
    // handle fn
    if (xmlnode.parentNode.tagName === 'fn') {
      const span = this.createNode('span', '<sup></sup>', {
        'data-ams-doc': 'label'
      });
      htmlParentNode.appendChild(span);
      const superscript = span.firstElementChild;
      this.passThrough(superscript, xmlnode);
      return;
    }
    // handle ref
    if (xmlnode.parentNode.tagName === 'ref') {
      // NOTE the DT created in ref.js serves as wrapper
      this.passThrough(htmlParentNode, xmlnode);
      return;
    }
    // handle fig, fig-group via caption
    if (
      xmlnode.parentNode.tagName === 'fig' ||
      xmlnode.parentNode.tagName === 'fig-group'
    ) {
      caption(htmlParentNode, xmlnode);
      return;
    }
    const nextSibling = xmlnode.nextElementSibling;
    // NOTE if a label is followed by a title, we skip (and pull in the label later on when processing title)
    if (nextSibling && nextSibling.tagName === 'title') return;
    // NOTE ignore empty label
    if (xmlnode.tagName === 'label' && xmlnode.innerHTML.trim() === '') return;
    const previousSibling = xmlnode.previousElementSibling;
    const hasLabelSibling =
      previousSibling &&
      previousSibling.tagName === 'label' &&
      previousSibling.innerHTML.trim() !== '';
    const altTitle = [...xmlnode.parentNode.children].find(node => node.tagName === 'alt-title');
    const hasAltTitle = altTitle && altTitle.innerHTML !== xmlnode.innerHTML;
    const isBook = xmlnode.ownerDocument.firstElementChild.tagName === 'book'; // TODO extract into property or function?

    const subtitleSibling = [...xmlnode.parentNode.children].find(node => node.tagName === 'subtitle');
    const hasSubtitleSibling = subtitleSibling && subtitleSibling.innerHTML.trim() !== '';
    const isStatement = xmlnode.parentNode.tagName === 'statement';
    const isDispFormulaGroup = xmlnode.parentNode.tagName === 'disp-formula-group';
    const level = getParentLevel(htmlParentNode) + 1;
    const header = this.createNode('header');
    const heading = (isStatement || isDispFormulaGroup) ? this.createNode('figcaption', '') : this.createNode(`h${level}`, '');
    if (hasSubtitleSibling) {
      htmlParentNode.appendChild(header);
      header.appendChild(heading);
    } else {
      htmlParentNode.appendChild(heading);
    }
    if (hasLabelSibling) {
      const labelSpan = this.createNode('span', '', { 'data-ams-doc': 'label' });
      heading.appendChild(labelSpan);
      this.passThrough(labelSpan, previousSibling);
      const labelSeparatorString = isStatement ? ' ' : '. ';
      labelSpan.insertAdjacentText('beforeend', labelSeparatorString);
    }
    if (isBook && hasAltTitle) {
      const altTitleContent = altTitle.innerHTML;
      heading.setAttribute('data-ams-doc-alttitle', heading.textContent + altTitleContent); // NOTE assumes hasLabelSibling handled first
    }
    this.passThrough(heading, xmlnode);
    if (isStatement) heading.insertAdjacentText('beforeend', heading.textContent.endsWith('.') ? ' ' : '. ');
    if (hasSubtitleSibling) this.recurseTheDom(header, subtitleSibling);
  };
