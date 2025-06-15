import BaseHTMLElement from "../base/BaseHTMLElement.js";

class MenuPage extends BaseHTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }


    async connectedCallback() {
        await this.loadHTML("/blocks/menuPage/menuPage.template");
    }
}


customElements.define("menu-page", MenuPage);
export default MenuPage;