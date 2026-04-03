import ProductCard from './cart'

function Products({ products, title = 'Special Products for You', subtitle = 'Handpicked deals just for you' }) {
  return (
    <div className="px-4 md:px-6 py-6">
      <h1 className="text-2xl md:text-3xl font-semibold mb-1">{title}</h1>
      <p className="text-gray-500 mb-4 text-sm">{subtitle}</p>

      <div className="relative border border-gray-200 rounded-xl p-4 md:p-5 bg-white">
        <span className="absolute top-0 left-0 w-5 h-5 border-t-4 border-l-4 border-yellow-400 rounded-tl-xl"></span>
        <span className="absolute top-0 right-0 w-5 h-5 border-t-4 border-r-4 border-yellow-400 rounded-tr-xl"></span>
        <span className="absolute bottom-0 left-0 w-5 h-5 border-b-4 border-l-4 border-yellow-400 rounded-bl-xl"></span>
        <span className="absolute bottom-0 right-0 w-5 h-5 border-b-4 border-r-4 border-yellow-400 rounded-br-xl"></span>

        {products.length === 0
          ? <p className="text-center text-gray-400 py-10">No products found.</p>
          : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
        }
      </div>
    </div>
  )
}

export default Products
