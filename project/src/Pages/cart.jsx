import { useState, useEffect } from 'react';

function ProductCard({ product }) {
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('wishlist')) || []);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const sync = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setInCart(!!cart.find(i => i.id === product.id));
    };
    window.addEventListener('cartUpdated', sync);
    return () => window.removeEventListener('cartUpdated', sync);
  }, [product.id]);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const exists = cart.find(i => i.id === product.id);
    const updated = exists
      ? cart.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i)
      : [...cart, { ...product, qty: 1 }];
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const toggleWishlist = () => {
    const updated = wishlist.find(i => i.id === product.id)
      ? wishlist.filter(i => i.id !== product.id)
      : [...wishlist, product];
    setWishlist(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const isWishlisted = wishlist.find(i => i.id === product.id);
  const [inCart, setInCart] = useState(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    return !!cart.find(i => i.id === product.id);
  });

  const removeFromCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updated = cart.filter(i => i.id !== product.id);
    localStorage.setItem('cart', JSON.stringify(updated));
    window.dispatchEvent(new Event('cartUpdated'));
    setInCart(false);
    setAdded(false);
  };

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm relative flex flex-col">

      {/* Heart */}
      <button onClick={toggleWishlist}
        className="absolute top-2 right-2 bg-white rounded-full w-7 h-7 flex items-center justify-center shadow z-10 text-base">
        {isWishlisted ? '❤️' : '🤍'}
      </button>

      {/* Image */}
      <div className="h-44 flex items-center justify-center p-3 bg-gray-50">
        <img src={product.image} alt={product.title} className="h-full object-contain" />
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1">
        <p className="text-xs font-semibold text-black mb-1 line-clamp-2 flex-1">{product.title}</p>
        <p className="text-xs text-gray-400 mb-1">⭐ {product.rating?.rate} ({product.rating?.count})</p>
        <p className="text-sm font-bold text-black mb-3">${product.price}</p>
        <div className="flex gap-2">
          <button onClick={addToCart}
            className={`flex-1 py-2 font-semibold text-xs rounded-lg transition ${added ? 'bg-green-500 text-white' : 'bg-yellow-400 text-white hover:bg-yellow-500'}`}>
            {added ? '✓ Added!' : 'Add to Cart'}
          </button>
          {(added || inCart) && (
            <button onClick={removeFromCart}
              className="py-2 px-3 bg-red-100 text-red-500 hover:bg-red-500 hover:text-white text-xs font-semibold rounded-lg transition">
              🗑
            </button>
          )}
        </div>
      </div>

    </div>
  );
}

export default ProductCard;
