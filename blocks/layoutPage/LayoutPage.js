import BaseHTMLElement from "../base/BaseHTMLElement.js";


class LayoutPage extends BaseHTMLElement {

    constructor(){ 
        super();
        this.attachShadow({ mode: 'open' });
    }


    async connectedCallback() {
        await this.loadHTML("/blocks/layoutPage/layoutPage.template");

        if(!app.isAuthenticated) {
            const personIcon = this.shadowRoot.querySelector(".layout-page__account-icon");
            personIcon.style.display = 'none';
        }
        else {
            const registrationButton = this.shadowRoot.querySelector(".layout-page__account-register");
            registrationButton.style.display = 'none';
        }

        // const wrapper = this.shadowRoot.querySelector(".layout-page__image-wrapper");
        // const titleElement = this.shadowRoot.querySelector(".layout-page__title");

        const addButtonLayout = this.shadowRoot.querySelector(".layout-page__add-button");

        // this.addEventListener("see-item", (event) => {
        //     addButtonLayout.dataset.productId = event.detail.productId;
        //     console.log(addButtonLayout);
        // });

        addButtonLayout.addEventListener("click", () => {
            alert(`Añadido al carrito el producto con Id = ${addButtonLayout.dataset.productId}`);
        })
    }
}

customElements.define("layout-page", LayoutPage);
export default LayoutPage;
