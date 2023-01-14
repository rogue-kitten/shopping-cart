import StoreItems from '../data/items.json';
import { StoreItem } from '../components/StoreItem';

export function Store() {
  return (
    <div className="mx-auto container py-3 px-4 xs:px-10">
      <h1 className="text-4xl font-bold">Store</h1>
      <div className="grid grid-col-1 ss:grid-cols-2 md:grid-cols-3 grid-flow-row gap-7 mt-10">
        {StoreItems.map((item) => (
          <StoreItem key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
