import BaseHTMLElement from "../base/BaseHTMLElement.js";


class LayoutPage extends BaseHTMLElement {

    constructor(){ 
        super();
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
    }



}

customElements.define("layout-page", LayoutPage);
export default LayoutPage;
