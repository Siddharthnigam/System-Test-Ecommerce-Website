import News from '../assets/newslatter.jpg'

function NewsLater() {
  return (
    <div className="relative w-full h-56 md:h-72 my-6 md:my-8 overflow-hidden rounded-xl mx-auto px-4 md:px-6">
      <img src={News} alt="newsletter" className="absolute inset-0 w-full h-full object-cover z-0" />
      <div className="absolute inset-0  z-10" />
      <div className="relative z-20 flex flex-col items-center justify-center h-full gap-3 px-4 text-center">
        <h2 className="text-2xl md:text-4xl font-bold text-white tracking-wide">Join Our Newsletter</h2>
        <p className="text-gray-300 text-xs md:text-sm">Subscribe to get special offers, free giveaways, and updates.</p>
        <div className="flex items-center bg-white w-full max-w-xs md:max-w-md mt-1">
          <input type="email" placeholder="Enter your email" className="flex-1 px-3 md:px-4 py-2 md:py-2.5 outline-none text-sm text-black rounded-l-lg" />
          <button className="px-4 md:px-6 py-2 md:py-2.5 bg-yellow-400 text-white font-bold text-sm rounded-r-lg hover:bg-yellow-500 transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  )
}

export default NewsLater
