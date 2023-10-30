'use client'

import { ProductWithTotalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";
import { ReactNode, createContext, useState } from "react";

export interface CartProduct extends ProductWithTotalPrice {
    quantity: number,
}


 interface ICartContext {
    products: CartProduct[];
    cartTotalPrice: number;
    cartBasePrice: number;
    cartTotalDiscount: number;
    addProductToCart: (product: CartProduct) => void;
    decreaseProductQuantity: (ProductId: string) => void;
    increaseProductQuantity: (ProductId: string) => void;
}

export const CartContext = createContext<ICartContext>({
    products: [],
    cartTotalPrice: 0,
    cartBasePrice: 0,
    cartTotalDiscount: 0,
    addProductToCart: () => {},
    decreaseProductQuantity: () => {},
    increaseProductQuantity: () => {}
});

const CartProvider = ({children}: { children: ReactNode}) => {
    const [products, setProducts ] = useState<CartProduct[]>([])

    const addProductToCart = (product: CartProduct) => {

        const productIsAlreadyOnCart = products.some(cartProduct => cartProduct.id == product.id) 

        if(productIsAlreadyOnCart){
            setProducts((prev) => 
            prev.map((cartProduct) => {
                if (cartProduct.id == product.id) {
                    return {
                        ...cartProduct, 
                        quantity: cartProduct.quantity + product.quantity,
                    }
                }
                return cartProduct
            })) 
            return
        }

        setProducts((prev) => [...prev, product]);
    }

    const decreaseProductQuantity = (productId: string) => {

        setProducts(prev => prev.map(cartProduct => {
            if(cartProduct.id == productId) {
                return {
                    ...cartProduct,
                    quantity: cartProduct.quantity -1,
                }
            }
            return cartProduct;
        }).filter((cartProduct) => cartProduct.quantity > 0))
    }

    const increaseProductQuantity = (productId: string) => {

        setProducts(prev => prev.map(cartProduct => {
            if(cartProduct.id == productId) {
                return {
                    ...cartProduct,
                    quantity: cartProduct.quantity +1,
                }
            }
            return cartProduct;
        }))
    }

    return ( 
        <CartContext.Provider 
        value={{
            products,
            addProductToCart,
            decreaseProductQuantity,
            increaseProductQuantity,
            cartTotalPrice: 0,
            cartBasePrice: 0,
            cartTotalDiscount: 0,
        }}>
            {children}
            </CartContext.Provider>
     );
}
 
export default CartProvider;