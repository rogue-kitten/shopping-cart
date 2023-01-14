import { NavLink } from 'react-router-dom';
import { ShoppingCartIcon } from '@heroicons/react/24/solid';
import { useCart } from '../context/CartContext';

export function Navbar() {
  function activeStyle({ isActive }: { isActive: boolean }) {
    return {
      textDecoration: isActive ? 'underline' : 'none',
      color: isActive ? '#000000' : 'rgb(100 116 139)',
      padding: '0.25rem 0.5rem',
    };
  }

  const { totalItems, openCart } = useCart();
  return (
    <nav className="mx-auto flex justify-between text-lg items-center container py-3 px-4 xs:px-10">
      <div className="space-x-3">
        <NavLink to="/" style={activeStyle}>
          Home
        </NavLink>
        <NavLink to="store" style={activeStyle}>
          Store
        </NavLink>
        <NavLink to="about" style={activeStyle}>
          About
        </NavLink>
      </div>
      <div
        className="rounded-full flex justify-center items-center w-12 h-12 border border-slate-500 cursor-pointer hover:bg-blue-500 hover:border-blue-500 hover:text-slate-100 relative"
        onClick={openCart}
        role="presentation"
      >
        <ShoppingCartIcon className="w-8 h-8 p-1" />
        {totalItems ? (
          <div className="flex p-1 w-5 h-5 right-0 -bottom-[10%] justify-center items-center rounded-full bg-red-500 text-white absolute text-xs">
            {totalItems}
          </div>
        ) : null}
      </div>
    </nav>
  );
}
