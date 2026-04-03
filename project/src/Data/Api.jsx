export async function fetchProducts() {
  const res = await fetch('https://dummyjson.com/products?limit=10');
  const data = await res.json();
  return data.products.map(p => ({
    id: p.id,
    title: p.title,
    price: p.price,
    image: p.thumbnail,
    category: p.category,
    rating: { rate: p.rating, count: p.stock },
  }));
}
