import authService from "./AuthService.js";

class BlogList {

    #blogs = [];
    page = 0;

    get blogs() {
        return this.sliceBlogs(this.#blogs);
    }

    static instance = null;

    static {
        this.instance = new BlogList();
    }

    constructor() {
        if(this.instance)
            throw new Error("Ya existe una instancia");
    }

    setBlogs(blogs) {
        this.#blogs = blogs;
    }

    getFavorites() {
        const favoriteBlogs = this.#blogs.filter(blog => blog.favorite == true);
        return this.sliceBlogs(favoriteBlogs);
    }

    getMyArticles() {
        const myArticles = this.#blogs.filter(blog => blog.authorId == authService.getUserId());
        return this.sliceBlogs(myArticles);
    }


    addFavorite(blogId) {
        const newFavoriteBlog = this.#blogs.find(blog => blog.id == blogId);
        newFavoriteBlog.favorite = true;
    }

    removeFavorite(blogId) {
        const newFavoriteBlog = this.#blogs.find(blog => blog.id == blogId);
        newFavoriteBlog.favorite = false;
    }

    getById(blogId) {
        return this.#blogs.find(blog => blog.id == blogId);
    }

    saveBlog(blogId, newTitle, newContent) {
        const blog = this.getById(blogId);

        blog.title = newTitle;
        blog.content = newContent;
    }

    sliceBlogs(blogs) {
        const indexLeft = this.page * 3;
        const indexRigth = indexLeft + 3;
        
        this.page += 1;
        return blogs.slice(indexLeft, indexRigth);
    }

    reset() {
        this.page = 0;
    }

    
}

export default BlogList;