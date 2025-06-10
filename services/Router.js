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

        const layoutPage = document.getElementById("main");
        let contentElement = null;

        switch(route) {
            case "/":
                contentElement = document.createElement("front-page");
                break;
            case "/menu":
                contentElement = document.createElement("h1");
                contentElement.textContent = "Menu";
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

        window.scrollY = 0;
        window.scrollX = 0;
    }
    
}


const router = new Router();
export default router;