class BaseHTMLElement extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }


    async loadHTML(path) {
        const response = await fetch(path);
        const html = await response.text();

        this.shadowRoot.innerHTML = html;
    }

}

export default BaseHTMLElement;