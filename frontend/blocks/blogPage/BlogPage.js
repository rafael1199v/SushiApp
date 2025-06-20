import BaseHTMLElement from '../base/BaseHTMLElement.js'

class BlogPage extends BaseHTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }


    connectedCallback() {
        this.init();
    }

    async init() {
        await this.loadHTML("/blocks/blogPage/blogPage.template");
    }

}

customElements.define("blog-page", BlogPage);
export default BlogPage;