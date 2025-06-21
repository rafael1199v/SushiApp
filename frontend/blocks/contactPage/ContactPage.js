import BaseHTMLElement from "../base/BaseHTMLElement.js";

class ContactPage extends BaseHTMLElement {
    
    constructor() {
        super();

        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.init();
    }

    async init() {
        await this.loadHTML("/blocks/contactPage/contactPage.template");

    }
}

customElements.define("contact-page", ContactPage);
export default ContactPage;