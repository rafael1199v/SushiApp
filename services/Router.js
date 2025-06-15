import Command from "./Command.js";
import { IMAGE_PAGES } from "./conf/ImagePagesConst.js";
import { LAYOUT_COMMAND, LayoutCommandExecutor } from "./LayoutCommand.js";

class Router {

    lastClassBackground = "";

    init() {
        window.addEventListener("popstate", (event) => {
            event.preventDefault();
            this.go(event.state.route, false);
        });

        this.go(location.pathname);
    }
    
    go(route, addToHistory = true) {

        if(addToHistory)
            history.pushState({ route }, "", route);

        const layoutPage = document.querySelector("layout-page")
        let contentElement = null;
        const pageConfig = {};

        switch(route) {
            case "/":
                contentElement = document.createElement("front-page");
                pageConfig.url = IMAGE_PAGES.FRONT_PAGE.url;
                pageConfig.title = IMAGE_PAGES.FRONT_PAGE.title;
                pageConfig.width = IMAGE_PAGES.FRONT_PAGE.width;
                pageConfig.height = IMAGE_PAGES.FRONT_PAGE.height;
                pageConfig.socials = IMAGE_PAGES.FRONT_PAGE.socials;

                break;

            case "/menu":
                contentElement = document.createElement("menu-page");
                pageConfig.url = IMAGE_PAGES.MENU_PAGE.url;
                pageConfig.title = IMAGE_PAGES.MENU_PAGE.title;
                pageConfig.width = IMAGE_PAGES.MENU_PAGE.width;
                pageConfig.height = IMAGE_PAGES.MENU_PAGE.height;
                pageConfig.socials = IMAGE_PAGES.MENU_PAGE.socials;

                break;

            case "/about":
                contentElement = document.createElement("h1");
                contentElement.textContent = "About";
                break;
            case "/book":
                contentElement = document.createElement("h1");
                contentElement.textContent = "Reservas";
                break;
            case "/contact":
                contentElement = document.createElement("h1");
                contentElement.textContent = "Contact";
                break;
            case "/blog":
                contentElement = document.createElement("h1");
                contentElement.textContent = "Blog";
                break;
            case "/signup":
                contentElement = document.createElement("h1");
                contentElement.textContent = "Registration";
                break;
            case "/login":
                contentElement = document.createElement("h1");
                contentElement.textContent = "Login";
                break;
        }

        if(!contentElement)
            return;
        

        if(layoutPage.firstElementChild)
            layoutPage.firstElementChild.remove();

        layoutPage.appendChild(contentElement);

        const commands = [];
        commands.push(new Command(LAYOUT_COMMAND.CHANGE_BACKGROUND, { url: pageConfig.url, width: pageConfig.width, height: pageConfig.height }));
        commands.push(new Command(LAYOUT_COMMAND.CHANGE_TITLE, { title: pageConfig.title }));
        commands.push(new Command(LAYOUT_COMMAND.TOGGLE_SOCIALS, { show: pageConfig.socials }));
        commands.push(new Command(LAYOUT_COMMAND.TOGGLE_ADD_BUTTON, { show: false }));

        LayoutCommandExecutor.multipleExecute(commands);

        window.scrollY = 0;
        window.scrollX = 0;
    }


    
    
}


const router = new Router();
export default router;