import Items from '../data/items.json';
import { formatCurrency } from '../utilities/formatCurrency';

interface CartItemProp {
  id: number;
  quantity: number;
  removeItem(id: number): void;
}

export function CartItem({ id, quantity, removeItem }: CartItemProp) {
  const item = Items.find((i) => i.id === id);
  if (item == null) return null;
  return (
    <div className="flex w-full space-x-3 justify-between px-3 ">
      <img
        src={item.imgUrl}
        alt={item.id.toString()}
        className="h-[100px] rounded-md  w-[100px] object-cover"
      />
      <div className="flex flex-1 items-center justify-between">
        <div>
          <span className="text-lg font-medium">{item.name}</span>
          <br />
          <span>{formatCurrency(item.price)}</span>
        </div>
        <div className="flex space-x-2">
          <span className="text-lg font-semibold">
            {formatCurrency(item.price * quantity)}
          </span>
          <button
            type="button"
            className="w-6 h-6 rounded-md bg-red-600 text-white"
            onClick={() => removeItem(item.id)}
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}
