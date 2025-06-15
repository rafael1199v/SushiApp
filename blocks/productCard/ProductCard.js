import BaseHTMLElement from "../base/BaseHTMLElement.js";
import { LAYOUT_COMMAND, LayoutCommandExecutor } from "../../services/LayoutCommand.js";
import Command from "../../services/Command.js";

class ProductCard extends BaseHTMLElement {

    constructor() {
        super();
    }

    async connectedCallback() {
        await this.loadHTML("/blocks/productCard/productCard.template");

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
                    productId: productId
                },
                bubbles: true,
                composed: true
            }));

            const commands = [];
            commands.push(new Command(LAYOUT_COMMAND.CHANGE_BACKGROUND, { url: src, width: '928px', height: '94vh'}));
            commands.push(new Command(LAYOUT_COMMAND.CHANGE_TITLE, { title: title }));
            commands.push(new Command(LAYOUT_COMMAND.TOGGLE_ADD_BUTTON, { show: true, productId: productId }));
            
            LayoutCommandExecutor.multipleExecute(commands);
        });

        titleElement.textContent = title;
        descriptionElement.textContent = description;
        imageElement.src = src;
        priceElement.textContent = price;
    }

}


customElements.define("product-card", ProductCard);
export default ProductCard;