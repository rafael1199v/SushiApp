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
        const productId = this.dataset.productId;

        const titleElement = this.querySelector(".product-card__title");
        const descriptionElement = this.querySelector(".product-card__description");
        const imageElement = this.querySelector(".product-card__img");
        const priceElement = this.querySelector(".product-card__price");

        const addButton = this.querySelector(".product-card__add-button");
        
        addButton.addEventListener("click", () => {
            this.dispatchEvent(new CustomEvent("add-item", {
                detail: {
                    productId: productId
                },
                bubbles: true,
                composed: true
            }));

            alert(`Agregado al carrito y el id es ${productId}`);
        });

        this.addEventListener("click", (event) => {
          
            if(event.target.closest(".product-card__add-button"))
                return;

            this.dispatchEvent(new CustomEvent("see-item", {
                detail: {
                    imgUrl: src,
                    productId: productId,
                    title: title
                },
                bubbles: true,
                composed: true
            }));
        });

        titleElement.textContent = title;
        descriptionElement.textContent = description;
        imageElement.src = src;
        priceElement.textContent = price;
    }

}


customElements.define("product-card", ProductCard);
export default ProductCard;