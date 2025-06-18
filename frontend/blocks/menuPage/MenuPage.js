import BaseHTMLElement from "../base/BaseHTMLElement.js";
import ProductList from "../../services/ProductList.js";
import { CATEGORY } from "../../services/conf/ProductCategoryConst.js";

class MenuPage extends BaseHTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }


    async connectedCallback() {
        await this.loadHTML("/blocks/menuPage/menuPage.template");
        const productsByCategory = await this.getProducts();
        this.renderProducts(productsByCategory);
    }

    async getProducts() {
        const response = await fetch('/data/products.json');

        if(!response.ok)
            console.error(response.status, "Error al obtener los productos");
        
       ProductList.instance.setProducts(await response.json());
       const categoryProducts = ProductList.instance.groupByCategories();

       return categoryProducts;
    }

    renderProducts(categoryProducts) {
        const template = this.shadowRoot.getElementById('menu-page__category-section-id');
        const fragment = new DocumentFragment();
        const content = this.shadowRoot.querySelector(".menu-page__content");

        for(let category in categoryProducts) {

            const section = template.content.cloneNode(true).firstElementChild;
            const categoryTitle = section.querySelector(".menu-page__category-title-content");
            const items = section.querySelector(".menu-page__category__items");

            if(category == CATEGORY.MAKI)
                categoryTitle.textContent = "Maki";

            else if(category == CATEGORY.URAMAKI)
                categoryTitle.textContent = "Uramaki";

            else if(category == CATEGORY.SPECIAL_ROLL)
                categoryTitle.textContent = "Special Rolls";


            for(let product of categoryProducts[category]) {
                const productElement = document.createElement("product-card");
                productElement.dataset.title = product.name;
                productElement.dataset.description = product.description;
                productElement.dataset.src = product.image;
                productElement.dataset.price = product.price;
                productElement.dataset.productId = product.id;

                items.appendChild(productElement);
            }

            fragment.appendChild(section);
        }

       content.appendChild(fragment);

    }


    
    
}


customElements.define("menu-page", MenuPage);
export default MenuPage;

/*
<div class="menu-page__category-section">
    <div class="menu-page__category-title">
        <div class="menu-page__category-logo">
            <img src="/assets/img/diamondIcon.svg" class="menu-page__logo-diamond"/>
            <div class="menu-page__logo-line"></div>
        </div>
        
        <h1 class="menu-page__category-title-content">Uramaki</h1>

        <div class="menu-page__category-logo">
            <div class="menu-page__logo-line"></div>
            <img src="/assets/img/diamondIcon.svg" class="menu-page__logo-diamond"/>
        </div>
        
    </div>
    <div class="menu-page__category__items">
        <product-card class="menu-page__category-item" 
            data-title="Volcano Delight"
            data-description="Tempura-fried shrimp, cucumber, and cream cheese embrace a center of fresh avocado, delivering a satisfying contrast of textures."
            data-src="/assets/img/product1.png"
            data-price="$10"
            data-product-id="5"
        ></product-card>

        <product-card class="menu-page__category-item" 
            data-title="Rainbow Fusion"
            data-description="Tempura-fried shrimp, cucumber, and cream cheese embrace a center of fresh avocado, delivering a satisfying contrast of textures."
            data-src="/assets/img/product1.png"
            data-price="$10"
            data-product-id="6"
        ></product-card>

        <product-card class="menu-page__category-item" 
            data-title="Dragon Elegance"
            data-description="Tempura-fried shrimp, cucumber, and cream cheese embrace a center of fresh avocado, delivering a satisfying contrast of textures."
            data-src="/assets/img/product1.png"
            data-price="$10"
            data-product-id="7"
        ></product-card>

        <product-card class="menu-page__category-item" 
            data-title="Sunset Serenity"
            data-description="Tempura-fried shrimp, cucumber, and cream cheese embrace a center of fresh avocado, delivering a satisfying contrast of textures."
            data-src="/assets/img/product1.png"
            data-price="$10"
            data-product-id="8"
        ></product-card>

        
    </div>
</div>

*/
