import { replaceTeXCharactersInNodes } from '../helpers/helpers-tex.js';

  /**
   * Process <text> element
   * @param {Node} htmlParentNode 
   * @param {Node} xmlnode 
   */
   export default function (htmlParentNode, xmlnode) {
    // NOTE currently no else as <text> only appears in <tex-math>
    if (xmlnode.closest('tex-math')) {
      replaceTeXCharactersInNodes(xmlnode);
      htmlParentNode.insertAdjacentText('beforeend', '\\text{');
      this.passThrough(htmlParentNode, xmlnode);
      htmlParentNode.insertAdjacentText('beforeend', '}');
    }
  };
