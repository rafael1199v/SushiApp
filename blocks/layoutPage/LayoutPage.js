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

        const wrapper = this.shadowRoot.querySelector(".layout-page__image-wrapper");
        const titleElement = this.shadowRoot.querySelector(".layout-page__title");
        const socials = this.shadowRoot.querySelector(".layout-page__socials");

        this.addEventListener("change-page", (event) => {
            
            switch(event.detail.route) {
                case "/":
                    wrapper.style.setProperty("--image-url", `url(/assets/img/front-page-image.jpg)`);
                    wrapper.style.setProperty("--image-width", `100%`);
                    socials.style.setProperty("--socials-display", "flex");
                    titleElement.innerHTML = "SUSHI <br/> SENSATION";
                    break;
                case "/menu":
                    wrapper.style.setProperty("--image-url", `url(/assets/img/menu-page.png)`);
                    wrapper.style.setProperty("--image-width", `928px`);
                    titleElement.innerHTML = "MENU";
                    socials.style.setProperty("--socials-display", "none");
                    break;

            }

        });


        this.addEventListener("see-item", (event) => {
            wrapper.style.setProperty("--image-url", `url(${event.detail.imgUrl})`);
            wrapper.style.setProperty("--image-width", `928px`);
            titleElement.innerHTML = event.detail.title;
        })
    }



}

customElements.define("layout-page", LayoutPage);
export default LayoutPage;
