import BaseHTMLElement from '../base/BaseHTMLElement.js'
import blogAPI from '../../services/Api/BlogApi.js';
import BlogList from '../../services/BlogList.js';
import Command from '../../services/Command/Command.js';
import { LAYOUT_COMMAND, LayoutCommandExecutor } from '../../services/Command/LayoutCommand.js';

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
        await this.getBlogs();
    }

    async getBlogs() {
        BlogList.instance.setBlogs(await blogAPI.getAllBlogs());

         const blogContainer = this.shadowRoot.querySelector(".blog-page__blogs");
        const blogs = BlogList.instance.blogs;
        const fragment = new DocumentFragment();

        blogContainer.innerHTML = "";

        for(let blog of blogs){
            const card = document.createElement("blog-card");
            
            card.dataset.title = blog.title;
            card.dataset.description = blog.description;
            card.dataset.authorId = blog.author.id;
            card.dataset.authorName = `Author: ${blog.author.name}`;
            card.dataset.date = blog.date;
            card.dataset.img = blog.img;
            card.dataset.favorite = blog.favorite;

            card.classList.add("blog-page__card--clickeable");

            this.normalCardAddEventListener(card);

            fragment.appendChild(card);
        }

        blogContainer.appendChild(fragment);
    }

    async getFavoriteBlogs() {

    }

    async getOwnBlogs() {

    }


    normalCardAddEventListener(card) {

        card.addEventListener("click", () => {
            const command = new Command(LAYOUT_COMMAND.CHANGE_BACKGROUND, { url: card.dataset.img, width: '963px' });
            const commandTitle = new Command(LAYOUT_COMMAND.CHANGE_TITLE, { title: "" });
            
            LayoutCommandExecutor.multipleExecute([command, commandTitle]);
        })
    }

}

customElements.define("blog-page", BlogPage);
export default BlogPage;