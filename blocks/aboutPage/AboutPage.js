import BaseHTMLElement from "../base/BaseHTMLElement.js"


class AboutPage extends BaseHTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.loadHTML("/blocks/aboutPage/aboutPage.template");
    }
}


customElements.define("about-page", AboutPage);
export default AboutPage;