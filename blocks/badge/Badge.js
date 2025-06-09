class BadgeIcon extends HTMLElement {
    
    constructor() {
        super();
    }

    async connectedCallback() {
        const response = await fetch("/blocks/badge/badge.template");
        const html = await response.text();
        this.innerHTML = html;

        const imgElement = this.querySelector(".badge__icon");

        const svgPath = this.getAttribute("src");
        const width = this.getAttribute("width");
        const height = this.getAttribute("height");

        imgElement.src = svgPath;
        imgElement.width = width;
        imgElement.height = height;
    }
}

customElements.define("badge-icon", BadgeIcon);
export default BadgeIcon;