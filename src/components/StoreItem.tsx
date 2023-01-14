import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utilities/formatCurrency';

interface StoreProps {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}
export function StoreItem({ id, name, price, imgUrl }: StoreProps) {
  const { increaseQuantity, decreaseQuantity, getItemQuantity, removeItem } =
    useCart();
  const quantity = getItemQuantity(id);
  return (
    <div className="w-full bg-white rounded-lg overflow-clip">
      <img
        src={imgUrl}
        alt={id.toString()}
        className="object-cover w-full h-[200px]"
      />
      <div className="w-full flex justify-between mt-4 px-3">
        <span className="font-semibold text-xl">{name}</span>
        <span className="font-semibold text-xl">{formatCurrency(price)}</span>
      </div>
      <div className="w-full flex justify-end items-center px-3 mb-4 mt-6">
        {quantity === 0 ? (
          <button
            type="button"
            onClick={() => increaseQuantity(id)}
            className="px-3 py-2 bg-blue-500 text-slate-100 rounded-md font-semibold"
          >
            Add to cart
          </button>
        ) : (
          <div className="flex flex-col items-end space-y-3">
            <div className="space-x-3">
              <button
                type="button"
                className="px-2 py-0.5 bg-blue-500 text-slate-100 rounded-md font-semibold"
                onClick={() => decreaseQuantity(id)}
              >
                -
              </button>
              <span className="font-semibold">{quantity}</span>
              <button
                type="button"
                className="px-1.5 py-0.5 bg-blue-500 text-slate-100 rounded-md font-semibold"
                onClick={() => increaseQuantity(id)}
              >
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => removeItem(id)}
              className="px-3 py-2 bg-red-500 text-slate-100 rounded-md font-semibold"
            >
              Remove Item
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
