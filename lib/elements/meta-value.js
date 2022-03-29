export default function (htmlParentNode, xmlnode) {
    // NOTE currently, we only have custom-meta[@specific-use='communicated-by']>meta-value; future publications might need more here
    const dd = this.createNode('dd');
    htmlParentNode.appendChild(dd);
    this.passThrough(dd, xmlnode);
  };
