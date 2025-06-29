import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if(!context)
        throw new Error("Se debe usar el proveedor");

    return context;
}

export const AuthContextProvider = ({ children }) => {

    const [token, setToken] = useState(() => {
        return localStorage.getItem("token") ?? null;
    });
    const [userId, setUserId] = useState(() => {
        return localStorage.getItem("userId") ?? -1;
    });

    const logout = () => {
        setToken(null);
        setUserId(-1);
    }

    return (
        <AuthContext.Provider value={{ token, userId, setToken, setUserId , logout }}>
            { children }
        </AuthContext.Provider>
    );
}