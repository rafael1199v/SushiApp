import BaseHTMLElement from "../base/BaseHTMLElement.js";


class LayoutPage extends BaseHTMLElement {

    constructor(){ 
        super();

        this.backgroundClassImage = "layout-page__image-wrapper--front-page";
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

        const wrapper = this.shadowRoot.querySelector(".layout-page__image-wrapper");
        console.log(wrapper);

        this.addEventListener("change-page", (event) => {
            wrapper.classList.remove(this.backgroundClassImage);

            switch(event.detail.route) {
                case "/":
                    this.backgroundClassImage = "layout-page__image-wrapper--front-page";
                    break;
                case "/menu":
                    this.backgroundClassImage = "layout-page__image-wrapper--menu";
                    break;
            }

            console.log("WTF", this.backgroundClassImage);
            wrapper.classList.add(this.backgroundClassImage);
        })
    }



}

customElements.define("layout-page", LayoutPage);
export default LayoutPage;
