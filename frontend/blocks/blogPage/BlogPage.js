import BaseHTMLElement from '../base/BaseHTMLElement.js'
import blogAPI from '../../services/Api/BlogApi.js';
import BlogList from '../../services/BlogList.js';
import authService from '../../services/AuthService.js';
import { IMAGE_PAGES } from '../../services/conf/ImagePagesConst.js';

class BlogPage extends BaseHTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.filter = "all";
        BlogList.instance.reset();
    }


    connectedCallback() {
        this.init();
    }

    async init() {
        await this.loadHTML("/blocks/blogPage/blogPage.template");
        await this.getBlogs();
        
        const creatButton = this.shadowRoot.querySelector(".blog-page__create-button");

        if(authService.isLoggedIn()) {
            this.addNav();
            this.renderBlogs(BlogList.instance.blogs, this.normalCardAddEventListener, true, true, true);
            creatButton.classList.remove("blog-page__create-button--hidden");
            creatButton.classList.add("blog-page__create-button--show");

            creatButton.addEventListener("click", () => {
                globalThis.app.router.go("/blog/create");
            })
        }
        else {
            const nav = this.shadowRoot.querySelector(".blog-page__nav");
            
            nav.style.display = "none";
            this.renderBlogs(BlogList.instance.blogs, this.normalCardAddEventListener, true, false, true);
        }

        const observedBlock = this.shadowRoot.querySelector(".blog-page__block-observer");

        const intersectionObserver = new IntersectionObserver((entries) => {
            for(const entry of entries) {
                if(entry.isIntersecting) {

                    let moreBlogs = [];

                    if(this.filter == "all"){
                        moreBlogs = BlogList.instance.blogs;
                        this.renderBlogs(moreBlogs, this.normalCardAddEventListener, true, authService.isLoggedIn(), false);
                    }
                    else if(this.filter == "favorites") {
                        moreBlogs = BlogList.instance.getFavorites();
                        this.renderBlogs(moreBlogs, this.normalCardAddEventListener, true, authService.isLoggedIn(), false);
                    }
                    else if(this.filter == "articles") {
                        moreBlogs = BlogList.instance.getMyArticles();
                        this.renderBlogs(moreBlogs, this.normalCardAddEventListener, true, false, false);
                    }

                    
                }
            }
        });

        intersectionObserver.observe(observedBlock);
    }

    async getBlogs() {
        BlogList.instance.setBlogs(await blogAPI.getAllBlogs());
    }

    renderBlogs(blogs, addEventListenerCard, clickeable, showStar, reset) {
        const blogContainer = this.shadowRoot.querySelector(".blog-page__blogs");
        const fragment = new DocumentFragment();
        
        if(reset)
            blogContainer.innerHTML = "";

        for(let blog of blogs){
            const card = document.createElement("blog-card");

            card.dataset.title = blog.title;
            card.dataset.description = blog.description;
            card.dataset.authorId = blog.authorId;
            card.dataset.authorName = `Author: ${blog.users.name}`;
            card.dataset.date = blog.date;
            card.dataset.img = blog.imageUrl;
            card.dataset.favorite = blog.favorite;
            card.dataset.id = blog.id;

            if(clickeable)
                card.classList.add("blog-page__card--clickeable");

            if(showStar)
                card.dataset.showStar = "true";

            addEventListenerCard(card);

            fragment.appendChild(card);
        }

        blogContainer.appendChild(fragment);
    }

    addNav() {
        const news = this.shadowRoot.getElementById("news");
        const favorites = this.shadowRoot.getElementById("favorites");
        const articles = this.shadowRoot.getElementById("articles");

        news.focus();

        news.addEventListener("click", () => {
            BlogList.instance.reset();
            this.filter = "all";
            this.renderBlogs(BlogList.instance.blogs, this.normalCardAddEventListener, true, true, true);
        });

        favorites.addEventListener("click", () => {
            BlogList.instance.reset();
            this.filter = "favorites";
            this.renderBlogs(BlogList.instance.getFavorites(), this.normalCardAddEventListener, true, true, true);
        });

        articles.addEventListener("click", () => {
            BlogList.instance.reset();
            this.filter = "articles";
            this.renderBlogs(BlogList.instance.getMyArticles(), this.normalCardAddEventListener, true, false, true);
        });
    }
   
    normalCardAddEventListener(card) {

        card.addEventListener("click", (event) => {

            if(event.target.closest(".blog-card__like-button"))
                return;

            IMAGE_PAGES.BLOG_DETAIL_PAGE.url = card.dataset.img;
            IMAGE_PAGES.BLOG_DETAIL_PAGE.width = '963px';
        
            globalThis.app.router.go(`/blog/${card.dataset.id}`);
        })
    }

}

customElements.define("blog-page", BlogPage);
export default BlogPage;