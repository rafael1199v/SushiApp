import BaseHTMLElement from "../base/BaseHTMLElement.js";

class Navbar extends BaseHTMLElement {

    constructor() {
        super();
    }

    async connectedCallback() {
        await this.loadHTML("/blocks/navbar/navbar.template");
        const modalMenu = this.shadowRoot.querySelector("modal-menu");
        const openButton = this.shadowRoot.querySelector(".navbar__menu-toggle");

        openButton.addEventListener("click", () => {
            modalMenu.classList.remove("navbar__modal-menu--hide");
        });


        modalMenu.shadowRoot.addEventListener("click", (event) => {
            if(!event.target.classList.contains("modal-menu__item"))
                return;

            modalMenu.classList.add("navbar__modal-menu--hide");
        })


    }

}

customElements.define("navbar-menu", Navbar);

export default Navbar;