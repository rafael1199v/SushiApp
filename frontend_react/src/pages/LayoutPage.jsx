import { Outlet } from "react-router-dom";
import BadgeIcon from "../components/badge/BadgeIcon";
import NavbarMenu from "../components/navbarMenu/NavbarMenu";

function LayoutPage() {
  return (
    <section className="layout-page">
        <div className="layout-page__image-wrapper">
            <div className="layout-page__menu">
                <NavbarMenu></NavbarMenu>
            </div>
        
            <p className="layout-page__title">SUSHI <br/> SENSATION</p>

            <div className="layout-page__socials">
                <BadgeIcon src="/assets/img/instagram-logo-light.svg" width="18" height="18"></BadgeIcon>
                <BadgeIcon src="/assets/img/facebook-logo-light.svg" width="18" height="18"></BadgeIcon>
                <BadgeIcon src="/assets/img/twitter-logo-light.svg" width="18" height="18"></BadgeIcon>
            </div>

            <div className="layout-page__account">
                <div className="layout-page__account-icon">
                    <img src="/assets/img/iconamoon_profile-fill.svg" className="layout-page__icon-person"/>
                </div>
                <button className="layout-page__account-register">
                    REGISTRATION    
                </button>

                <div className="layout-page__account-icon layout-page__account-icon--cart">
                    <img src="/assets/img/cart.svg" className="layout-page__icon-cart"/>
                    <div className="layout-page__icon-cart-count">0</div>
                </div>
            </div>


            <div className="layout-page__add-button">
                <svg width="40" height="40" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.8334 6.83171H6.83335V11.8317H5.16669V6.83171H0.166687V5.16504H5.16669V0.165039H6.83335V5.16504H11.8334V6.83171Z" fill="#272723" className="layout-page__add-icon-fill"/>
                </svg>
            </div>
        </div>
        
        <div className="layout-page__content">
            <div className="layout-page__content-main">
              <Outlet />
            </div>

            <footer className="layout-page__footer">
                <div className="layout-page__footer-copyright">
                    <p>Licensing</p>
                    <img src="/assets/img/diamondIcon.svg" className="modal-menu__logo-diamond"/>
                    <p>Styleguide</p>
                </div>
            </footer>
        </div>

    </section>
  )
}

export default LayoutPage