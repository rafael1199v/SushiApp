import { createContext, useContext, useState } from "react";


const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);

    if(!context)
        throw new Error("Se debe usar el proveedor");

    return context;
}

export const CartContextProvider = ({ children }) => {
    const [cart, setCart] = useState({});
    const [quantity, setQuantity] = useState(0);
    const [selectedProductId, setSelectedProductId] = useState(-1);

    const addProduct = (productId) => {
        if(!cart[productId])
            cart[productId] = 0;

        cart[productId] += 1;
        
        setQuantity((prevQuantity) => prevQuantity + 1);

        console.log(cart);
    }
    
    return (
        <CartContext.Provider value={{cart, quantity, addProduct, setSelectedProductId, selectedProductId}}>
            { children }
        </CartContext.Provider>
    );
}