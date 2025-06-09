import BaseHTMLElement from '../base/BaseHTMLElement.js'

class FrontPage extends BaseHTMLElement {

    constructor() {
        super();
    }

    async connectedCallback() {
        await this.loadHTML('/blocks/frontPage/frontPage.template');

        if(!app.isAuthenticated) {
            const personIcon = this.shadowRoot.querySelector(".front-page__account-icon");
            personIcon.style.display = 'none';
        }
        else {
            const registrationButton = this.shadowRoot.querySelector(".front-page__account-register");
            registrationButton.style.display = 'none';
        }
        
    }
}


customElements.define("front-page", FrontPage);

export default FrontPage;