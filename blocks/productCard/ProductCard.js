class ProductCard extends HTMLElement {

    constructor() {
        super();
    }

    async loadHMTL(path) {
        const response = await fetch(path);
        const html = await response.text();

        this.innerHTML = html;
    }

    async connectedCallback() {
        await this.loadHMTL("/blocks/productCard/productCard.template");

        const title = this.dataset.title;
        const description = this.dataset.description;
        const src = this.dataset.src;
        const price = this.dataset.price;

        const titleElement = this.querySelector(".product-card__title");
        const descriptionElement = this.querySelector(".product-card__description");
        const imageElement = this.querySelector(".product-card__img");
        const priceElement = this.querySelector(".product-card__price");

        titleElement.textContent = title;
        descriptionElement.textContent = description;
        imageElement.src = src;
        priceElement.textContent = price;
    }

}


customElements.define("product-card", ProductCard);
export default ProductCard;