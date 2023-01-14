import React, { ReactNode, useContext, useState } from 'react';
import { Cart } from '../components/Cart';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface CartContextProps {
  getItemQuantity(id: number): number;
  increaseQuantity(id: number): void;
  decreaseQuantity(id: number): void;
  removeItem(id: number): void;
  totalItems: number;
  cartItems: CartItem[];
  openCart(): void;
}

export interface CartItem {
  id: number;
  quantity: number;
}

const CartContext = React.createContext({} as CartContextProps);

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [toggleCart, setToggleCart] = useState<boolean>(false);
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'shopping-cart',
    []
  );

  function getItemQuantity(id: number) {
    return cartItems.find((item: CartItem) => item.id === id)?.quantity || 0;
  }

  function increaseQuantity(id: number) {
    setCartItems((Items) => {
      if (Items.find((item) => item.id === id) == null) {
        return [...Items, { id, quantity: 1 }];
      }
      return Items.map((item) => {
        if (item.id === id) {
          return { id: item.id, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  }

  function decreaseQuantity(id: number) {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter((item) => item.id !== id);
      }
      return currItems.map((item) => {
        if (item.id === id) return { id, quantity: item.quantity - 1 };
        return item;
      });
    });
  }

  function removeItem(id: number) {
    const quantity = getItemQuantity(id);
    if (quantity) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    }
  }

  const totalItems =
    cartItems.length === 0
      ? 0
      : cartItems.reduce(
          (accumulator, currentValue) => accumulator + currentValue.quantity,
          0
        );
  const openCart = () => setToggleCart(true);
  const closeCart = () => setToggleCart(false);

  return (
    <CartContext.Provider
      value={{
        decreaseQuantity,
        increaseQuantity,
        getItemQuantity,
        removeItem,
        totalItems,
        cartItems,
        openCart,
      }}
    >
      {toggleCart ? (
        <Cart
          closeCart={closeCart}
          cartItems={cartItems}
          removeItem={removeItem}
        />
      ) : null}
      {children}
    </CartContext.Provider>
  );
}
