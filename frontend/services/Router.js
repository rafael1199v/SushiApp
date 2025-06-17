import Command from "./Command.js";
import { IMAGE_PAGES } from "./conf/ImagePagesConst.js";
import { LAYOUT_COMMAND, LayoutCommandExecutor } from "./LayoutCommand.js";

class Router {

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
                pageConfig.footer = IMAGE_PAGES.FRONT_PAGE.footer;

                break;

            case "/menu":
                contentElement = document.createElement("menu-page");
                pageConfig.url = IMAGE_PAGES.MENU_PAGE.url;
                pageConfig.title = IMAGE_PAGES.MENU_PAGE.title;
                pageConfig.width = IMAGE_PAGES.MENU_PAGE.width;
                pageConfig.height = IMAGE_PAGES.MENU_PAGE.height;
                pageConfig.socials = IMAGE_PAGES.MENU_PAGE.socials;
                pageConfig.footer = IMAGE_PAGES.MENU_PAGE.footer;

                break;

            case "/about":
                contentElement = document.createElement("about-page");
                pageConfig.url = IMAGE_PAGES.ABOUT_PAGE.url;
                pageConfig.title = IMAGE_PAGES.ABOUT_PAGE.title;
                pageConfig.width = IMAGE_PAGES.ABOUT_PAGE.width;
                pageConfig.height = IMAGE_PAGES.ABOUT_PAGE.height;
                pageConfig.socials = IMAGE_PAGES.ABOUT_PAGE.socials;
                pageConfig.footer = IMAGE_PAGES.ABOUT_PAGE.footer;
                break;
            case "/book":
                contentElement = document.createElement("h1");
                pageConfig.url = IMAGE_PAGES.BOOK_TABLE_PAGE.url;
                pageConfig.title = IMAGE_PAGES.BOOK_TABLE_PAGE.title;
                pageConfig.width = IMAGE_PAGES.BOOK_TABLE_PAGE.width;
                pageConfig.height = IMAGE_PAGES.BOOK_TABLE_PAGE.height;
                pageConfig.socials = IMAGE_PAGES.BOOK_TABLE_PAGE.socials;
                pageConfig.footer = IMAGE_PAGES.BOOK_TABLE_PAGE.footer;

                break;
            case "/contact":
                contentElement = document.createElement("h1");
                pageConfig.url = IMAGE_PAGES.CONTACT_PAGE.url;
                pageConfig.title = IMAGE_PAGES.CONTACT_PAGE.title;
                pageConfig.width = IMAGE_PAGES.CONTACT_PAGE.width;
                pageConfig.height = IMAGE_PAGES.CONTACT_PAGE.height;
                pageConfig.socials = IMAGE_PAGES.CONTACT_PAGE.socials;
                pageConfig.footer = IMAGE_PAGES.CONTACT_PAGE.footer;
                break;
            case "/blog":
                contentElement = document.createElement("h1");
                pageConfig.url = IMAGE_PAGES.BLOG_PAGE.url;
                pageConfig.title = IMAGE_PAGES.BLOG_PAGE.title;
                pageConfig.width = IMAGE_PAGES.BLOG_PAGE.width;
                pageConfig.height = IMAGE_PAGES.BLOG_PAGE.height;
                pageConfig.socials = IMAGE_PAGES.BLOG_PAGE.socials;
                pageConfig.footer = IMAGE_PAGES.BLOG_PAGE.footer;
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
        commands.push(new Command(LAYOUT_COMMAND.TOGGLE_FOOTER, { show: pageConfig.footer }));

        LayoutCommandExecutor.multipleExecute(commands);

        window.scrollY = 0;
        window.scrollX = 0;
    }


    
    
}


const router = new Router();
export default router;