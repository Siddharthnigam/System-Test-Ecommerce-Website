import { useState, useEffect } from 'react'
import Navbar from './Pages/navbar'
import Slider from './Pages/slider'
import Products from './Pages/products'
import Products2 from './Pages/products2'
import { fetchProducts } from './Data/Api'
import News from './Pages/newsLater'
import Footer from './Pages/footer'

function App() {
  const [products, setProducts] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    fetchProducts().then(data => setProducts(data))
  }, [])

  const filtered = products.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.category.toLowerCase().includes(query.toLowerCase())
  )

  const isSearching = query.trim().length > 0

  return (
    <div>
      <Navbar query={query} setQuery={setQuery} />
      <Slider />
      {isSearching ? (
        <Products products={filtered} title="Search Results" subtitle={`${filtered.length} result(s) for "${query}"`} />
      ) : (
        <>
          <Products products={products.slice(0, 5)} title="Special Products for You" subtitle="Handpicked deals just for you" />
          <Products2 products={products.slice(5, 10)} />
        </>
      )}
      <News />
      <Footer />
    </div>
  )
}

export default App
