import Navbar from "./blocks/navbar/Navbar.js";
import FrontPage from "./blocks/frontPage/FrontPage.js";
import BadgeIcon from "./blocks/badge/Badge.js";
import ModalMenu from "./blocks/modalMenu/ModalMenu.js";
import LayoutPage from "./blocks/layoutPage/LayoutPage.js";
import router from "./services/Router.js";

globalThis.app = {};

app.isAuthenticated = false;
app.router = router;

document.addEventListener("DOMContentLoaded", () => {
    app.router.init();
});