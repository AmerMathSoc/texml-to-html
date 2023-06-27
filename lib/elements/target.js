import mapAttributes from '../helpers/mapAttributes.js';
import { node2macro } from '../helpers/helpers-tex.js';

/**
 * target element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  if (xmlnode.closest('tex-math')) {
    node2macro.apply(this, [htmlParentNode, xmlnode, `cssId{${xmlnode.id}}`, false]);
    // store tag as JSON/array in an attribute on the HTML parent
    if (xmlnode.innerHTML.startsWith('\\tag{')) { // NOTE heuristic, cf. #401, AmerMathSoc/texml#157
      const tagArray = htmlParentNode.hasAttribute('data-ams-tags') ? JSON.parse(htmlParentNode.getAttribute('data-ams-tags')) : [];
      tagArray.push(this.passthroughIntoHTMLString(xmlnode).slice(5, -1)); // NOTE we only need passThroughIntoHTMLString here, i.e., we don't need node2macro, because node2macro already ran; in particular node2macro already modified xmlnode to escape active TeX characters.
      htmlParentNode.setAttribute('data-ams-tags', JSON.stringify(tagArray));
    }
    return;
  }
  const span = this.createNode('span');
  htmlParentNode.appendChild(span);
  mapAttributes(span, xmlnode);
  this.passThrough(span, xmlnode);
};
