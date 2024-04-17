"use client";

import {Product} from "@/domain/model/product.dto";
import React, {ReactNode, createContext, useContext, useState, useEffect} from "react";
import {CartItem} from "@/domain/model/cartitem";

interface CartContextType {
    cart: CartItem[];
    totalPrice: number;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType>({
    cart: [],
    totalPrice: 0,
    addToCart: (product: Product) => {
    },
    removeFromCart: (productId: number) => {
    },
    clearCart: () => {
    },
});

export const CartProvider = ({children}: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    const addToCart = (product: Product) => {
        const existingItem = cart.find((item) => item.product.id === product.id);
        if (existingItem) {
            setCart(
                cart.map((item) => item.product.id === product.id ? {...item, quantity: item.quantity + 1} : item)
            );
        } else {
            setCart([...cart, {product, quantity: 1}]);
        }
    };

    const removeFromCart = (productId: number) => {
        const existingItem = cart.find((item) => item.product.id === productId);
        if (existingItem) {
            if (existingItem.quantity <= 1) {
                setCart(cart.filter((item) => item.product.id !== productId));
            } else {
                setCart(
                    cart.map((item) => item.product.id === productId ? {...item, quantity: item.quantity - 1} : item)
                );
            }
        } else {
            setCart(cart.filter((item) => item.product.id !== productId));
        }
    };

    const clearCart = () => {
        setCart([]);
    };

    useEffect(() => {
        const newTotalPrice = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
        setTotalPrice(newTotalPrice);
    }, [cart]);

    return (
        <CartContext.Provider value={{cart, totalPrice, addToCart, removeFromCart, clearCart}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
