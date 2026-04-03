import { useState, useEffect } from 'react';
import Logo from '../assets/logo.png';

function Navbar({ query, setQuery }) {
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('cart')) || []);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const syncCart = () => setCart(JSON.parse(localStorage.getItem('cart')) || []);
    const syncWishlist = () => setWishlist(JSON.parse(localStorage.getItem('wishlist')) || []);
    const closeProfile = () => setShowProfile(false);
    window.addEventListener('cartUpdated', syncCart);
    window.addEventListener('wishlistUpdated', syncWishlist);
    window.addEventListener('click', closeProfile);
    return () => {
      window.removeEventListener('cartUpdated', syncCart);
      window.removeEventListener('wishlistUpdated', syncWishlist);
      window.removeEventListener('click', closeProfile);
    };
  }, []);

  const updateQty = (id, qty) => {
    const updated = qty < 1 ? cart.filter(i => i.id !== id) : cart.map(i => i.id === id ? { ...i, qty } : i);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeFromCart = (id) => {
    const updated = cart.filter(i => i.id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter(i => i.id !== id);
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const moveToCart = (product) => {
    const c = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = c.find(i => i.id === product.id);
    const updated = exists
      ? c.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      : [...c, { ...product, qty: 1 }];
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
    removeFromWishlist(product.id);
  };

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <>
      <nav className="w-full bg-white shadow-sm sticky top-0 z-50 px-4 md:px-7 py-3">
        <div className="flex items-center justify-between gap-4">

          {/* Logo */}
          <img className="w-28 md:w-36 " src={Logo} alt="logo" />

          {/* Search — hidden on mobile */}
          <div className="hidden md:flex flex-1 max-w-lg items-center border-2 border-gray-300 rounded-lg overflow-hidden">
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search for Products, Brands and More"
              className="flex-1 p-2 h-10 outline-none text-sm"
            />
            <button className="px-4 h-10 bg-yellow-400 text-white font-semibold">🔍</button>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-5">
            <div className="relative">
              <button onClick={(e) => { e.stopPropagation(); setShowProfile(p => !p); }} className="flex items-center gap-1 text-sm font-medium">
                <span className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-lg">👤</span>
                <span>Trim</span>
                <span className="text-xs">▾</span>
              </button>
              {showProfile && (
                <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-xl shadow-lg w-44 z-50 overflow-hidden">
                  {['My Profile', 'My Orders', 'Settings', 'Logout'].map(item => (
                    <button key={item} className="w-full text-left px-4 py-2.5 text-sm hover:bg-yellow-50 hover:text-yellow-500 transition">{item}</button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => setShowWishlist(true)} className="relative flex items-center gap-1 text-sm font-medium">
              🤍 Wishlist
              {wishlist.length > 0 && <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{wishlist.length}</span>}
            </button>

            <button onClick={() => setShowCart(true)} className="relative flex items-center gap-1 text-sm font-medium">
              🛒 Cart
              {cartCount > 0 && <span className="absolute -top-2 -right-3 bg-yellow-400 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{cartCount}</span>}
            </button>
          </div>

          {/* Mobile: cart + hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <button onClick={() => setShowCart(true)} className="relative text-xl">
              🛒
              {cartCount > 0 && <span className="absolute -top-1 -right-2 bg-yellow-400 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>}
            </button>
            <button onClick={() => setMenuOpen(m => !m)} className="text-2xl">☰</button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="flex md:hidden mt-2 items-center border-2 border-gray-300 rounded-lg overflow-hidden">
          <input
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search products..."
            className="flex-1 p-2 h-9 outline-none text-sm"
          />
          <button className="px-3 h-9 bg-yellow-400 text-white">🔍</button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="flex md:hidden flex-col gap-2 mt-3 border-t pt-3">
            {['My Profile', 'My Orders', 'Settings'].map(item => (
              <button key={item} className="text-left text-sm px-2 py-1.5 hover:text-yellow-500">{item}</button>
            ))}
            <button onClick={() => { setShowWishlist(true); setMenuOpen(false); }} className="text-left text-sm px-2 py-1.5 hover:text-yellow-500">
              🤍 Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
            </button>
          </div>
        )}
      </nav>

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end" onClick={() => setShowCart(false)}>
          <div className="bg-white w-full max-w-sm md:w-96 h-full flex flex-col shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold">Cart ({cartCount})</h2>
              <button onClick={() => setShowCart(false)} className="text-gray-400 hover:text-black text-xl">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {cart.length === 0
                ? <p className="text-center text-gray-400 mt-16">Your cart is empty</p>
                : cart.map(item => (
                  <div key={item.id} className="flex gap-3 items-center border-b pb-3">
                    <img src={item.image} alt={item.title} className="w-14 h-14 object-contain rounded bg-gray-50 p-1" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold line-clamp-2 mb-1">{item.title}</p>
                      <p className="text-sm font-bold text-yellow-500">${(item.price * item.qty).toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-6 h-6 rounded-full border text-sm font-bold flex items-center justify-center hover:bg-gray-100">−</button>
                        <span className="text-sm font-semibold">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-6 h-6 rounded-full border text-sm font-bold flex items-center justify-center hover:bg-gray-100">+</button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-red-400 hover:text-red-600 text-lg">🗑</button>
                  </div>
                ))}
            </div>
            {cart.length > 0 && (
              <div className="p-4 border-t">
                <div className="flex justify-between font-bold text-base mb-3">
                  <span>Total</span><span>${total.toFixed(2)}</span>
                </div>
                <button className="w-full py-2.5 bg-yellow-400 text-white font-bold rounded-lg hover:bg-yellow-500 transition">Checkout</button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Wishlist Modal */}
      {showWishlist && (
        <div className="fixed inset-0 bg-black/50 z-50 flex justify-end" onClick={() => setShowWishlist(false)}>
          <div className="bg-white w-full max-w-sm md:w-96 h-full flex flex-col shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-lg font-bold">Wishlist ({wishlist.length})</h2>
              <button onClick={() => setShowWishlist(false)} className="text-gray-400 hover:text-black text-xl">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              {wishlist.length === 0
                ? <p className="text-center text-gray-400 mt-16">Your wishlist is empty</p>
                : wishlist.map(item => (
                  <div key={item.id} className="flex gap-3 items-center border-b pb-3">
                    <img src={item.image} alt={item.title} className="w-14 h-14 object-contain rounded bg-gray-50 p-1" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold line-clamp-2 mb-1">{item.title}</p>
                      <p className="text-sm font-bold text-black">${item.price}</p>
                      <button onClick={() => moveToCart(item)} className="mt-1 text-xs bg-yellow-400 text-white px-3 py-1 rounded-lg hover:bg-yellow-500 transition font-semibold">Move to Cart</button>
                    </div>
                    <button onClick={() => removeFromWishlist(item.id)} className="text-red-400 hover:text-red-600 text-lg">🗑</button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
