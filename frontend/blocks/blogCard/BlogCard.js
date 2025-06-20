import BaseHTMLElement from "../base/BaseHTMLElement.js";
import { formatDateTime } from "../../utils/Time.js";

class BlogCard extends BaseHTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.init();
    }

    async init() {
        await this.loadHTML("/blocks/blogCard/blogCard.template");

        const title = this.dataset.title;
        const description = this.dataset.description;
        const authorId = this.dataset.authorId;
        const authorName = this.dataset.authorName;
        const date = this.dataset.date;
        const img = this.dataset.img;
        const favorite = this.dataset.favorite;

        const imgElement = this.querySelector(".blog-card__image");
        const dateElement = this.querySelector(".blog-card__date-content");
        const titleElement = this.querySelector(".blog-card__title");
        const descriptionElement = this.querySelector(".blog-card__description");
        const authorElement = this.querySelector(".blog-card__author");

        imgElement.src = img;
        dateElement.textContent = formatDateTime(new Date(date));
        titleElement.textContent = title;
        descriptionElement.textContent = description;
        authorElement.textContent = authorName;
    }
}

customElements.define("blog-card", BlogCard);
export default BlogCard;