import Items from '../data/items.json';
import { formatCurrency } from '../utilities/formatCurrency';
import { CartItem } from './CartItem';

interface Item {
  id: number;
  quantity: number;
}

interface CartProps {
  closeCart(): void;
  cartItems: Item[];
  removeItem(id: number): void;
}

export function Cart({ closeCart, cartItems, removeItem }: CartProps) {
  const total = cartItems.reduce(
    (acc, item) =>
      (Items.find((i) => i.id === item.id)?.price || 0) * item.quantity + acc,
    0
  );
  return (
    <div
      onBlur={closeCart}
      className="fixed right-0 top-0 bg-white z-10 w-screen xs:w-[400px] min-h-screen"
    >
      <div className="w-full flex px-4 mt-4 justify-between items-center font-bold text-slate-600 text-2xl">
        <span>Cart</span>
        <span
          className="cursor-pointer text-red-600 font-bold text-4xl"
          onClick={closeCart}
          role="presentation"
        >
          &times;
        </span>
      </div>
      <div className="flex flex-col space-y-3 mt-6">
        {cartItems.map((items) => (
          <CartItem key={items.id} {...items} removeItem={removeItem} />
        ))}
      </div>
      <div className="px-3 text-right text-xl font-bold space-x-2">
        <span>Total</span>
        <span>{formatCurrency(total)}</span>
      </div>
    </div>
  );
}
