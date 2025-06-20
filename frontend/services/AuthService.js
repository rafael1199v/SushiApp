class AuthService {


    isLoggedIn() {
        return globalThis.app.isAuthenticated;
    }

}


const authService = new AuthService();
export default authService;