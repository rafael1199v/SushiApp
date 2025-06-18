import BaseHTMLElement from "../base/BaseHTMLElement.js"

class FormButton extends BaseHTMLElement {
    constructor() {
        super();
        
    }

    connectedCallback() {
        this.init();
    }

    async init() {
        await this.loadHTML("/blocks/formButton/formButton.template");

        const button = this.querySelector(".form-button");
        button.textContent = this.dataset.title;
    }
}


customElements.define("form-button", FormButton);
export default FormButton;