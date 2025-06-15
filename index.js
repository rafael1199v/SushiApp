import Navbar from "./blocks/navbar/Navbar.js";
import FrontPage from "./blocks/frontPage/FrontPage.js";
import BadgeIcon from "./blocks/badge/Badge.js";
import ModalMenu from "./blocks/modalMenu/ModalMenu.js";
import LayoutPage from "./blocks/layoutPage/LayoutPage.js";
import MenuPage from "./blocks/menuPage/MenuPage.js";
import router from "./services/Router.js";
import Buttton from "./blocks/button/Button.js"
import ProductCard from "./blocks/productCard/ProductCard.js";


globalThis.app = {};

app.isAuthenticated = true;
app.router = router;

document.addEventListener("DOMContentLoaded", () => {
    app.router.init();
});