import Navbar from "./blocks/navbar/Navbar.js";
import FrontPage from "./blocks/frontPage/FrontPage.js";
import BadgeIcon from "./blocks/badge/Badge.js";
import ModalMenu from "./blocks/modalMenu/ModalMenu.js";
import MenuPage from "./blocks/menuPage/MenuPage.js";
import router from "./services/Router.js";
import Buttton from "./blocks/button/Button.js"
import ProductCard from "./blocks/productCard/ProductCard.js";
import AboutPage from "./blocks/aboutPage/AboutPage.js";
import { CartCommand, CartCommandExecutor } from "./services/CartCommand.js";
import Command from "./services/Command.js";
import CartPage from "./blocks/cartPage/CartPage.js";
import FormButton from "./blocks/formButton/FormButton.js";


globalThis.app = {};

app.isAuthenticated = false;
app.router = router;

document.addEventListener("DOMContentLoaded", () => {
    app.router.init();
});

document.addEventListener("DOMContentLoaded", () => {
    if(!app.isAuthenticated) {
        const personIcon = document.querySelector(".layout-page__account-icon");
        personIcon.style.display = 'none';
    }
    else {
        const registrationButton = document.querySelector(".layout-page__account-register");
        registrationButton.style.display = 'none';
    }

    const addButtonLayout = document.querySelector(".layout-page__add-button");

    addButtonLayout.addEventListener("click", () => {
        //alert(`Añadido al carrito el producto con Id = ${addButtonLayout.dataset.productId}`);
        const command = new Command(CartCommand.ADD, {productId: addButtonLayout.dataset.productId});
        CartCommandExecutor.execute(command);
    });

    const cartIcon = document.querySelector(".layout-page__account-icon--cart");

    cartIcon.addEventListener("click", () => {
        app.router.go('/cart');
    });



})