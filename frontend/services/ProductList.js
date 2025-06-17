class ProductList {

    #products = [];

    get products() {
        return this.#products;
    }

    static instance = null;
    static {
        this.instance = new ProductList();
    }

    constructor(){
        if(ProductList.instance)
            throw new Error("Ya existe una instancia de la clase");
    }

    filterByCategory(categoryId){
        return this.#products.filter(product => product.categoryId == categoryId);
    }
    
}