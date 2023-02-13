import { generateByline } from "../helpers/generateByline.js";
/**
 * sec-meta element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  const contributors = this.extractContribGroups(xmlnode);
  const secmetaSection = this.createNode('section', '', {
    'data-ams-doc': 'sec-meta',
    'data-ams-contributors': JSON.stringify(contributors),
    'data-ams-byline': generateByline(contributors),
  });
  htmlParentNode.appendChild(secmetaSection);

  // NOTE: use cases for content within sec-meta so far: MCL1/14 has abstract; noti2382 has notes.
  this.passThrough(secmetaSection, xmlnode);
  // NOTE: MCL01, MCL14 also have questionable contrib-group with just author-comment (which was intentionally broken via #254, cf. also AmerMathSoc/mcl#13)
};
