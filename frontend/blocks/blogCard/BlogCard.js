import BaseHTMLElement from "../base/BaseHTMLElement.js";

class BlogCard extends BaseHTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.init();
    }

    async init() {
        await this.loadHTML("/blocks/blogCard/blogCard.template")
    }
}

customElements.define("blog-card", BlogCard);
export default BlogCard;