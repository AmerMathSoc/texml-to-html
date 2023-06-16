import { node2macro } from '../helpers/helpers-tex.js';

/**
 * text element
 * @param {HTMLElement} htmlParentNode 
 * @param {Element} xmlnode 
 */
export default function (htmlParentNode, xmlnode) {
  // NOTE currently no else as <text> only appears in <tex-math>
  if (xmlnode.closest('tex-math')) {
    node2macro.apply(this, [htmlParentNode, xmlnode, 'text', true]);
  }
};
