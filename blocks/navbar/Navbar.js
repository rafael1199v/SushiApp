import BaseHTMLElement from "../base/BaseHTMLElement.js";

class Navbar extends BaseHTMLElement {

    constructor() {
        super();
        this.html = this.loadHTML("/blocks/navbar/navbar.template")
    }

}

customElements.define("navbar-menu", Navbar);

export default Navbar;