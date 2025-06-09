import BaseHTMLElement from '../base/BaseHTMLElement.js';

class ModalMenu extends BaseHTMLElement {

    constructor() {
        super();
    }

    async connectedCallback() {
        await this.loadHTML("/blocks/modalMenu/modalMenu.template");

    }
}


customElements.define("modal-menu", ModalMenu);

export default ModalMenu;