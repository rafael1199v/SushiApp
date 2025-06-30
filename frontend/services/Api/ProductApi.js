import { API_URL } from "../conf/BackendUrl.js";
import { CATEGORY } from "../conf/ProductCategoryConst.js";

class ProductAPI {
    
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }


    async getProducts() {

        if(localStorage.getItem("products")) {
            return JSON.parse(localStorage.getItem("products"));
        }

        const url = `${this.baseUrl}/product`;

        const response = await fetch(url);

        if(!response.ok) {
            console.error(response.status, "Error al obtener los productos");
            return [];
        }

        const data = await response.json();
        localStorage.setItem("products", JSON.stringify(data.products));
        
        // let newProducts = [];

        // for(let i = 0; i < 15; i++) {
        //     newProducts.push(data.products[i]);
        // }
        
        // return newProducts;

        return data.products;
    }


    async getModeProducts(page = 1, categoryId) {
        let products = await this.getProducts();
        products = products.filter(product => product.categoryId == categoryId);

        const indexLeft = page * 3;
        const indexRigth = indexLeft + 2;

        products = products.slice(indexLeft, indexRigth);

        
        
        console.log(products, "Slice de ", indexLeft, indexRigth);

        return products;
    }
}


const productAPI = new ProductAPI(API_URL);
export default productAPI;