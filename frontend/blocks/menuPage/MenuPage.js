import BaseHTMLElement from "../base/BaseHTMLElement.js";
import ProductList from "../../services/ProductList.js";
import { CATEGORY } from "../../services/conf/ProductCategoryConst.js";
import productAPI from "../../services/Api/ProductApi.js";

class MenuPage extends BaseHTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.pageCategories = {
            [CATEGORY.MAKI]: 0,
            [CATEGORY.URAMAKI]: 0,
            [CATEGORY.SPECIAL_ROLL]: 0
        };
    }

    connectedCallback() {
        this.init();    
    }

    async init() {
        await this.loadHTML("/blocks/menuPage/menuPage.template");
        const productsByCategory = await this.getProducts();

        this.renderProducts(productsByCategory);
        this.applyButtonListeners();
    }   

    async getProducts() {
        const products = await productAPI.getProducts();
      
       ProductList.instance.setProducts(products);
       const categoryProducts = ProductList.instance.groupByCategories();

       return categoryProducts;
    }

    renderProducts(categoryProducts) {
        const template = this.shadowRoot.getElementById('menu-page__category-section-id');
        const fragment = new DocumentFragment();
        const content = this.shadowRoot.querySelector(".menu-page__content");
        content.innerHTML = "";

        for(let category in categoryProducts) {

            const section = template.content.cloneNode(true).firstElementChild;
            const categoryTitle = section.querySelector(".menu-page__category-title-content");
            const items = section.querySelector(".menu-page__category__items");
            items.dataset.categoryId = category;

            if(category == CATEGORY.MAKI)
                categoryTitle.textContent = "Maki";

            else if(category == CATEGORY.URAMAKI)
                categoryTitle.textContent = "Uramaki";

            else if(category == CATEGORY.SPECIAL_ROLL)
                categoryTitle.textContent = "Special Rolls";


            for(let product of categoryProducts[category]) {
                const productElement = document.createElement("product-card");
                productElement.classList.add("menu-page__item");
                productElement.dataset.title = product.name;
                productElement.dataset.description = product.description;
                productElement.dataset.src = product.imageUrl;
                productElement.dataset.price = `$${product.price}`;
                productElement.dataset.productId = product.id;
                productElement.dataset.vegetarian = product.vegetarian;

                items.appendChild(productElement);
            }

            fragment.appendChild(section);

            const containerObserver = document.createElement("div");
            
            containerObserver.classList.add("menu-page__block-observer");
            containerObserver.dataset.categoryId = category;


            const intersectionObserver = new IntersectionObserver(async (entries) => {
                for(const entry of entries) {
                    if(entry.isIntersecting) {

                        const categoryId = entry.target.dataset.categoryId;
                        console.log("Se ha intersectado la categoria", categoryId);
                        const pageNumber = this.pageCategories[entry.target.dataset.categoryId] + 1;

                        const moreProducts = await productAPI.getModeProducts(pageNumber, categoryId);

                        this.loadModeProducts(categoryId, moreProducts);

                        this.pageCategories[entry.target.dataset.categoryId] += 1;

                        
                    }
                }
            });

            intersectionObserver.observe(containerObserver);

            fragment.appendChild(containerObserver);
        }


       content.appendChild(fragment);
       
    }



    applyButtonListeners() {
        const buttons = this.shadowRoot.querySelector(".menu-page__navbar");
        const allButton = this.shadowRoot.getElementById('all-button');

        buttons.addEventListener("click", (event) => {

            if(!event.target.parentElement.matches('button-custom'))
                return;

            const categoryId = event.target.parentElement.dataset.categoryId;
            const filteredCategoryProducts = ProductList.instance.groupByCategories();

            this.pageCategories = { 
                [CATEGORY.MAKI]: 0,
                [CATEGORY.URAMAKI]: 0,
                [CATEGORY.SPECIAL_ROLL]: 0
            }

            if(categoryId == CATEGORY.ALL){
                this.renderProducts(filteredCategoryProducts);
            }
            else {

                const filteredObject = {
                    [categoryId]: filteredCategoryProducts[categoryId]
                };

                this.renderProducts(filteredObject);
            }
           
        });
    }


    loadModeProducts(categoryId, moreProducts) {
        const listItems = Array.from(this.shadowRoot.querySelectorAll(".menu-page__category__items"));
        const listSelected = listItems.find(block => block.dataset.categoryId == categoryId);
       
        const fragment = new DocumentFragment();

        for(let product of moreProducts) {
            const productElement = document.createElement("product-card");
            productElement.classList.add("menu-page__item");
            productElement.dataset.title = product.name;
            productElement.dataset.description = product.description;
            productElement.dataset.src = product.imageUrl;
            productElement.dataset.price = `$${product.price}`;
            productElement.dataset.productId = product.id;
            productElement.dataset.vegetarian = product.vegetarian;

            fragment.appendChild(productElement);
        }

        listSelected.appendChild(fragment);
    }


    
    
}


customElements.define("menu-page", MenuPage);
export default MenuPage;