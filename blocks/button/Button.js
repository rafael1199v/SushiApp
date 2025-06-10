class Button extends HTMLElement {

    constructor() {
        super();
    }

    async loadHMTL(path) {
        const response = await fetch(path);
        const html = await response.text();

        this.innerHTML = html;
    }

    async connectedCallback() {
        await this.loadHMTL("/blocks/button/button.template");
        
        const button = this.querySelector(".button");
        const title = this.dataset.title;
        button.textContent = title;
    }

}


customElements.define("button-custom", Button);
export default Button;