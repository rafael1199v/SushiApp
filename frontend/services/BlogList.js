class BlogList {

    #blogs = [];
    #favoriteBlogs = [];

    get favorites() {
        return this.#favoriteBlogs;
    }

    get blogs() {
        return this.#blogs;
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
    
    setFavoriteBlogs(blogs) {
        this.#favoriteBlogs = blogs;
    }
}