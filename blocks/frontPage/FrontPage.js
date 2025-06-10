import BaseHTMLElement from '../base/BaseHTMLElement.js'

class FrontPage extends BaseHTMLElement {

    constructor() {
        super();
    }

    async connectedCallback() {
        await this.loadHTML('/blocks/frontPage/frontPage.template');
    }
}


customElements.define("front-page", FrontPage);

export default FrontPage;