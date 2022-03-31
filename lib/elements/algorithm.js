export function alg(htmlParentNode, xmlnode) {
    const node = this.createNode('alg-algorithm');
    if (xmlnode.getAttribute('linenodelimiter')) node.setAttribute('data-ams-alg-linenodelimiter', xmlnode.getAttribute('linenodelimiter'));
    htmlParentNode.appendChild(node);
    this.passThrough(node, xmlnode);
};

export function algLine(htmlParentNode, xmlnode) {
    const spansLineNo = ['alg:require', 'alg:ensure'].includes(xmlnode.firstElementChild.tagName); // TODO if texml generated a suitable attribute, we wouldn't need an allowlist
    const lineNo = this.createNode('alg-lineno');
    htmlParentNode.appendChild(lineNo);
    if (!spansLineNo && xmlnode.getAttribute('lineno')) lineNo.innerHTML = `${xmlnode.getAttribute('lineno')}${xmlnode.closest('[linenodelimiter]').getAttribute('linenodelimiter')}`;
    const node = this.createNode('alg-line');
    if (spansLineNo) node.setAttribute('data-ams-alg-spanslineno');
    htmlParentNode.appendChild(node);
    this.passThrough(node, xmlnode);
};

export function algBlock(htmlParentNode, xmlnode) {
    const node = this.createNode('alg-block');
    const nestedLevel = htmlParentNode.closest('[data-ams-alg-blocklevel]') ? parseInt(htmlParentNode.closest('[data-ams-alg-blocklevel]').getAttribute('data-ams-alg-blocklevel')) + 1 : 1;
    node.setAttribute('data-ams-alg-blocklevel', nestedLevel);
    htmlParentNode.appendChild(node);
    this.passThrough(node, xmlnode);
};

export function algStatement(htmlParentNode, xmlnode) {
    const node = this.createNode('alg-statement');
    htmlParentNode.appendChild(node);
    this.passThrough(node, xmlnode);
};

export function algComment(htmlParentNode, xmlnode) {
    const node = this.createNode('alg-comment');
    htmlParentNode.appendChild(node);
    this.passThrough(node, xmlnode);
};
