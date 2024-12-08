import { createContext, useState, useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id);
    
    if (existingCartItem){
        return (
            cartItems.map((cartItem) => {
                return cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem;
            })
        )
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    const existingCartItem = cartItems.find((cartItem) => cartItem.id === cartItemToRemove.id);

    if (existingCartItem.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
    }

    return (
        cartItems.map((cartItem) => {
            return cartItem.id === cartItemToRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem;
        })
    )
}

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemtoCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0,
    cartTotal: 0,
})

export const CartProvider = ({ children }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartTotal = cartItems.reduce((total, cartItem) => {
            return total + cartItem.quantity * cartItem.price
        }, 0)

        setCartTotal(newCartTotal)
    }, [cartItems])

    useEffect(() => {
        const newCartCount = cartItems.reduce((accumulator, cartItem) => {
            return accumulator + cartItem.quantity
        }, 0)
        setCartCount(newCartCount);
    }, [cartItems])

    const addItemtoCart = (productToAdd) => {
        return setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (cartItemToRemove) => {
        return setCartItems(removeCartItem(cartItems, cartItemToRemove))
    }

    const clearItemFromCart = (cartItemToClear) => {
        setCartItems(clearCartItem(cartItems, cartItemToClear));
    }

    const value = { 
        isCartOpen, 
        setIsCartOpen, 
        cartItems, 
        addItemtoCart, 
        removeItemFromCart, 
        cartCount, 
        clearItemFromCart, 
        cartTotal,
    };
    return <CartContext.Provider value={value}>{ children }</CartContext.Provider>
}